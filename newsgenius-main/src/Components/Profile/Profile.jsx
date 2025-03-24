import React, { useState, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, CircularProgress } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostCard from "../HomeSection/PostCard";
import GradeIcon from '@mui/icons-material/Grade';
import ProfileModal from "./ProfileModal";
import { userAPI, articleAPI } from "../../config/api.config";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const { id } = useParams();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    name: "User",
    username: "user",
    bio: "No bio available",
    role: "user",
    location: "",
    joinedDate: "Unknown",
    following: 0,
    followers: 0,
    rating: 0,
    image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
    backgroundImage: "https://cdn.pixabay.com/photo/2021/07/02/00/20/woman-6380562_640.jpg",
    isVerified: false,
    profession: ""
  });
  const [articles, setArticles] = useState([]);
  
  // Check if the profile is the current user's profile
  const currentUserId = localStorage.getItem('userId');
  const isCurrentUser = id === currentUserId;

  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const handleBack = () => navigate(-1);
  
  const handleFollowUser = () => {
    console.log("follow user");
  };
  
  const handletabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle profile updates from ProfileModal
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    
    // Update the users object in localStorage
    try {
      let users = {};
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
      
      // Update the specific user's profile
      users[id] = updatedProfile;
      localStorage.setItem('users', JSON.stringify(users));
      
      // Also update userProfile for backward compatibility if this is the current user
      if (isCurrentUser) {
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        // Update the username in localStorage if it's the current user
        if (updatedProfile.name) {
          localStorage.setItem('userName', updatedProfile.name);
        }
      }
    } catch (err) {
      console.error('Error updating user profile in localStorage:', err);
    }
  };

  // Fetch user profile
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Get all user profiles from localStorage
        let userData = null;
        
        try {
          // First check if there's a users object containing all profiles
          const storedUsers = localStorage.getItem('users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            // Find the profile for the current user ID
            const userProfile = users[id];
            if (userProfile) {
              userData = userProfile;
            }
          }
          
          // If no user-specific profile was found, try getting userProfile for backward compatibility
          if (!userData) {
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
              userData = JSON.parse(storedProfile);
            }
          }
          
          // Check if userData has image properties and they're base64 strings
          // If not, set default images
          if (!userData || !userData.image || typeof userData.image !== 'string' || !userData.image.startsWith('data:')) {
            if (!userData) userData = {};
            userData.image = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png";
          }
          
          if (!userData || !userData.backgroundImage || typeof userData.backgroundImage !== 'string' || !userData.backgroundImage.startsWith('data:')) {
            if (!userData) userData = {};
            userData.backgroundImage = "https://cdn.pixabay.com/photo/2021/07/02/00/20/woman-6380562_640.jpg";
          }
        } catch (err) {
          console.error('Error parsing stored profile:', err);
        }
        
        // If no stored profile, create default profile from localStorage data or signup data
        if (!userData || Object.keys(userData).length === 0) {
          // Try to get user info from signup data
          const storedUserInfoString = localStorage.getItem('userInfo');
          let storedUserInfo = null;
          
          if (storedUserInfoString) {
            try {
              storedUserInfo = JSON.parse(storedUserInfoString);
            } catch (err) {
              console.error('Error parsing user info:', err);
            }
          }
          
          const userName = localStorage.getItem('userName') || (storedUserInfo ? storedUserInfo.name : 'User');
          const userRole = localStorage.getItem('userRole') || (storedUserInfo ? storedUserInfo.role : 'user');
          
          userData = {
            name: userName,
            username: userName.toLowerCase().replace(/\s+/g, '_'),
            bio: `Hello, I am ${userName}`,
            role: userRole,
            location: storedUserInfo?.location || "India",
            joinedDate: "June 2022",
            following: 190,
            followers: 590,
            rating: 4.3,
            image: storedUserInfo?.image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
            backgroundImage: storedUserInfo?.backgroundImage || "https://cdn.pixabay.com/photo/2021/07/02/00/20/woman-6380562_640.jpg",
            isVerified: true,
            profession: storedUserInfo?.profession || "Education",
            website: storedUserInfo?.website || ""
          };
          
          // Store this profile in the users object
          let users = {};
          try {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
              users = JSON.parse(storedUsers);
            }
          } catch (err) {
            console.error('Error parsing stored users:', err);
          }
          
          users[id] = userData;
          localStorage.setItem('users', JSON.stringify(users));
          
          // Also store for backwards compatibility
          if (isCurrentUser) {
            localStorage.setItem('userProfile', JSON.stringify(userData));
          }
        }
        
        setProfile(userData);
        
        // Get user articles from localStorage
        let userArticles = [];
        try {
          const storedArticles = localStorage.getItem('articles');
          if (storedArticles) {
            const allArticles = JSON.parse(storedArticles);
            // Filter articles by current user ID
            userArticles = allArticles.filter(article => 
              article.user && (article.user.id === id)
            );
          }
        } catch (err) {
          console.error('Error parsing stored articles:', err);
        }
        
        // If no articles found, create a sample one for display
        if (userArticles.length === 0) {
          userArticles = [{
            id: 1,
            content: "This is a sample article. Create your first post to see it here!",
            createdAt: new Date().toISOString(), // Convert to string to avoid date object issues
            user: {
              id: id,
              fullName: userData.name,
              image: userData.image
            }
          }];
        }
        
        setArticles(userArticles);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [id, currentUserId, isCurrentUser]);

  // Add a useEffect to check and update user information when the component loads
  useEffect(() => {
    const ensureUserDataConsistency = () => {
      try {
        const currentUserId = localStorage.getItem('userId');
        if (!currentUserId) return;
        
        // Check if user data exists and is consistent
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          
          // If the user exists in users object, make sure userProfile is up to date
          if (users[currentUserId]) {
            // Update the userProfile to match the current user data
            localStorage.setItem('userProfile', JSON.stringify(users[currentUserId]));
            console.log('Updated userProfile to match current user data');
          }
          
          // Also ensure userInfo is up to date
          const storedUserInfo = localStorage.getItem('userInfo');
          if (storedUserInfo) {
            const userInfo = JSON.parse(storedUserInfo);
            // Update userInfo with the latest user data
            if (users[currentUserId]) {
              const updatedUserInfo = {
                ...userInfo,
                name: users[currentUserId].name,
                email: users[currentUserId].email,
                role: users[currentUserId].role
              };
              localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            }
          }
        }
      } catch (err) {
        console.error('Error ensuring user data consistency:', err);
      }
    };
    
    ensureUserDataConsistency();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95 ml-3">
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {profile.name}
        </h1>
      </section>
      <section className="ml-3">
        <img
          className="w-[97%] h-[20rem] object-cover"
          src={profile.backgroundImage}
          alt="Cover"
          style={{ maxHeight: "20rem" }}
        />
      </section>

      <section className="pl-9">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt={profile.name}
            src={profile.image}
            sx={{ 
              width: "10rem", 
              height: "10rem", 
              border: "4px solid white",
              objectFit: "cover"
            }}
          />

          {isCurrentUser ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>
        <div>
        <div className="flex items-center">
          <h1 className="font-bold text-lg">{profile.name}</h1>
          {profile.isVerified && <img
            className="ml-2 w-5 h-5"
            src="data:image/png;base64,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"
            alt=""
          />}
        </div>
        <h1 className="text-gray-500">@{profile.username}</h1>
        </div>

        <div className="mt-2 space-y-3">
          <p>{profile.bio}</p>
          <div className="py-1 flex space-x-5">
            
            <div className="flex items-center text-gray-500">
           <BusinessCenterIcon/>
              <p className="ml-2">{profile.profession || "Not specified"}</p>
            </div>

            <div className="flex items-center text-gray-500">
           <LocationOnIcon/>
              <p className="ml-2">{profile.location || "Not specified"}</p>
            </div>

            <div className="flex items-center text-gray-500">
           <CalendarMonthIcon/>
              <p className="ml-2">Joined {profile.joinedDate}</p>
            </div>
            </div>
     
     
          <div className="flex items-center space-x-5">
             <div className="flex items-center space-x-1 font-semibold">
              <span>{profile.following}</span>
                <span className="text-gray-500">Following</span>
            </div>
            
              <div className="flex items-center space-x-1 font-semibold">
              <span>{profile.followers}</span>
                <span className="text-gray-500">Followers</span>
                </div>
                
                <div className="flex items-center space-x-1 font-semibold">
              <span>{typeof profile.rating === 'object' ? 0 : profile.rating}</span>
              <span><GradeIcon /></span>
                <span className="text-gray-500">Reporter Rating</span>
                </div>
             </div>
        </div>
      </section>

      <section className="py-5 px-3">
      <TabContext value={tabValue}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handletabChange} aria-label="lab API tabs example">
      <Tab label="Articles" value="1" />
      <Tab label="Replies" value="2" />
      <Tab label="Media" value="3" />
      <Tab label="Likes" value="4" />
    </TabList>
  </Box>
  <TabPanel value="1">
            {articles.length > 0 ? 
              articles.map((article) => <PostCard key={article.id} article={article} />) : 
              <p className="text-center py-5 text-gray-500">No articles found</p>
            }
  </TabPanel>
  <TabPanel value="2">user's Replies</TabPanel>
          <TabPanel value="3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {articles.filter(article => article.image).map((article) => (
                <div key={article.id} className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-sm hover:shadow-md">
                  <img 
                    src={article.image} 
                    alt="Media content" 
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => navigate(`/articledetails/${article.id}`)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs truncate">{article.content}</p>
                  </div>
                </div>
              ))}
              {articles.filter(article => article.image).length === 0 && (
                <div className="col-span-3 py-10 text-center">
                  <div className="flex flex-col items-center">
                    <PhotoLibraryIcon style={{ fontSize: 48 }} className="text-gray-300 mb-2" />
                    <p className="text-gray-500 mb-2">No media found</p>
                    <p className="text-sm text-gray-400">Share a post with an image to see it here</p>
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
  <TabPanel value="4">Likes</TabPanel>
</TabContext>
      </section>

      <section>
        <ProfileModal 
          handleClose={handleClose} 
          open={openProfileModal} 
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />
      </section>
    </div>
  );
};

export default Profile;
