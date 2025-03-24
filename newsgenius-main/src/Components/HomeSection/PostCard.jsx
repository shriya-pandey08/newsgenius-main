import React, { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, CardActions, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { FavoriteBorder, Favorite, ChatBubbleOutline, Repeat, Share, MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { articleAPI, reactionAPI, commentAPI } from '../../config/api.config';
import ReplyModal from './ReplyModal';
import { format } from 'date-fns';

// Debug helper function to ensure dates are handled safely
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (err) {
    console.error('Error formatting date:', dateString, err);
    return 'Invalid date';
  }
};

// Helper to safely format content
const safeContent = (content) => {
  if (typeof content === 'string') return content;
  if (content === null || content === undefined) return '';
  if (typeof content === 'object') return JSON.stringify(content);
  return String(content);
};

const PostCard = ({ article }) => {
  // Safety check for article
  const safeArticle = article || {};
  
  // Log article to help debug
  useEffect(() => {
    console.log('Article data:', safeArticle);
  }, [safeArticle]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');
  const currentUserId = localStorage.getItem('userId');
  const isAuthor = (safeArticle.userId === currentUserId) || (safeArticle.user?.id === currentUserId);
  const canModifyArticle = ['REPORTER', 'CHANNEL'].includes(userRole) && isAuthor;

  useEffect(() => {
    const fetchReactions = async () => {
      if (!safeArticle.id) {
        console.error('Article ID is missing, cannot fetch reactions');
        return;
      }
      
      try {
        const [likesResponse, commentsResponse, sharesResponse] = await Promise.all([
          reactionAPI.getLikes(safeArticle.id),
          commentAPI.getComments(safeArticle.id),
          reactionAPI.getShares(safeArticle.id)
        ]);

        setLikesCount(likesResponse.data.length);
        setLiked(likesResponse.data.some(like => like.userId === currentUserId));
        
        // Process comments to ensure they have valid content
        const processedComments = commentsResponse.data.map(comment => {
          // Make a shallow copy to avoid modifying the original data
          const processedComment = {...comment};
          
          // Debug log to see what's in the comment content
          console.log('Raw comment content:', comment.content, 'Type:', typeof comment.content);
          
          // Make sure the content is a string
          if (typeof processedComment.content !== 'string') {
            if (processedComment.content === null || processedComment.content === undefined) {
              processedComment.content = 'Comment';
            } else if (typeof processedComment.content === 'object') {
              // If it's an object, try to extract the content property or stringify it
              if (processedComment.content.content && typeof processedComment.content.content === 'string') {
                processedComment.content = processedComment.content.content;
              } else {
                try {
                  processedComment.content = JSON.stringify(processedComment.content);
                } catch (e) {
                  processedComment.content = 'Comment';
                }
              }
            } else {
              processedComment.content = String(processedComment.content);
            }
          }
          
          // Final log to confirm the processed content
          console.log('Processed comment content:', processedComment.content);
          
          return processedComment;
        });
        
        setComments(processedComments);
        setCommentsCount(processedComments.length);
        setSharesCount(sharesResponse.data.length);
      } catch (err) {
        console.error('Error fetching reactions:', err);
      }
    };

    fetchReactions();
  }, [safeArticle.id, currentUserId]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await articleAPI.deleteArticle(safeArticle.id);
      window.location.reload();
    } catch (err) {
      setError('Failed to delete article');
    }
    handleMenuClose();
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await reactionAPI.unlikeArticle(safeArticle.id);
        setLikesCount(prev => prev - 1);
      } else {
        await reactionAPI.likeArticle(safeArticle.id);
        setLikesCount(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      setError('Failed to update like');
    }
  };

  const handleReply = () => {
    setShowReplyModal(true);
  };

  const handleShare = async () => {
    try {
      await reactionAPI.shareArticle(safeArticle.id);
      setSharesCount(prev => prev + 1);
    } catch (err) {
      setError('Failed to share article');
    }
  };

  const handleProfileClick = () => {
    const profileId = safeArticle.user?.id || safeArticle.userId;
    if (profileId) {
      navigate(`/profile/${profileId}`);
    } else {
      console.error('No user ID available for this article');
    }
  };

  const handleArticleClick = () => {
    navigate(`/articledetails/${safeArticle.id}`);
  };

  const onCommentSubmit = async (content) => {
    try {
      // Ensure content is a string even if an object is passed
      const contentString = typeof content === 'string'
        ? content
        : (content && typeof content === 'object' && (content.content || typeof content.get === 'function'))
          ? (content.content || content.get('content') || '')
          : '';
      
      console.log('Submitting comment with content:', contentString);
      
      // Send the content directly as a string
      const response = await commentAPI.addComment(safeArticle.id, contentString);
      
      // Log the response
      console.log('Comment added response:', response);
      
      // Ensure the comment content is a string
      const newComment = {...response.data};
      if (typeof newComment.content !== 'string') {
        newComment.content = String(newComment.content || 'Comment');
      }
      
      setComments([...comments, newComment]);
      setCommentsCount(prev => prev + 1);
      setShowReplyModal(false);
    } catch (err) {
      setError('Failed to add comment');
      console.error('Comment submission error:', err);
    }
  };

  // If we have an invalid article, render nothing
  if (!safeArticle || typeof safeArticle !== 'object' || !safeArticle.id) {
    console.error('Invalid article data', safeArticle);
    return <div className="p-4 text-red-500">Error: Invalid article data</div>;
  }

  return (
    <Card className="mb-4">
      <CardHeader
        avatar={
        <Avatar
            src={safeArticle.user?.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'}
            alt={safeArticle.user?.fullName || 'User'}
            onClick={handleProfileClick}
        className="cursor-pointer" 
          />
        }
        title={
          <Typography variant="h6" className="cursor-pointer hover:underline" onClick={handleProfileClick}>
            {safeArticle.user?.fullName || safeArticle.author || 'Anonymous'}
          </Typography>
        }
        subheader={formatDate(safeArticle.createdAt)}
      />
      <CardContent onClick={handleArticleClick} className="cursor-pointer">
        <Typography variant="body1" className="whitespace-pre-wrap">
          {safeContent(safeArticle.content)}
        </Typography>
        {safeArticle.image && (
          <img
            src={safeArticle.image}
            alt="Article"
            className="mt-2 rounded-lg max-h-96 w-full object-cover"
          />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
          {liked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" className="mr-4">
          {likesCount}
        </Typography>
        <IconButton onClick={handleReply}>
          <ChatBubbleOutline />
        </IconButton>
        <Typography variant="body2" className="mr-4">
          {commentsCount}
        </Typography>
        <IconButton onClick={handleShare}>
          <Share />
        </IconButton>
        {canModifyArticle && (
           <div>
            <IconButton onClick={handleMenuClick}>
              <MoreHoriz />
            </IconButton>
      <Menu
        anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
           </div>
        )}
      </CardActions>

      {comments.length > 0 && (
        <div className="mt-4 space-y-3 px-4 pb-4">
          <h4 className="font-semibold">Comments</h4>
          {comments.map((comment) => {
            // Extra safety check for comment content
            const commentContent = typeof comment.content === 'string' 
              ? comment.content 
              : (comment.content && typeof comment.content === 'object' && comment.content.content) 
                ? comment.content.content
                : 'Comment';
              
            return (
              <div key={comment.id || Math.random()} className="bg-gray-50 p-3 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar src={comment.userAvatar} sx={{ width: 24, height: 24 }} />
                  <span className="font-medium text-sm">{comment.userName || 'User'}</span>
                  <span className="text-gray-500 text-xs">
                    {comment.createdAt ? format(new Date(comment.createdAt), 'MMM d, yyyy') : 'Just now'}
                  </span>
                </div>
                <p className="text-gray-800 text-sm">
                  {commentContent}
                </p>
                </div>
            );
          })}
        </div>
      )}

      <ReplyModal
        open={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        onSubmit={onCommentSubmit}
      />
    </Card>
  );
};

export default PostCard;
