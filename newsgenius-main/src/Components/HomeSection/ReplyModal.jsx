import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Comment is required')
    .min(1, 'Comment cannot be empty')
    .max(500, 'Comment cannot exceed 500 characters'),
});

const ReplyModal = ({ open, onClose, onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { content } = values;
        const trimmedContent = (content || '').trim();
        
        // Show an error if no content and no image
        if (!trimmedContent && !selectedImage) {
          setError('Comment cannot be empty');
          return;
        }
        
        // For debugging
        console.log('Submitting comment with content:', trimmedContent);
        
        let result;
        if (selectedImage) {
          const formData = new FormData();
          formData.append('content', trimmedContent);
          formData.append('image', selectedImage);
          result = await onSubmit(formData);
        } else {
          // Ensure we send a clean string, not an object
          result = await onSubmit(trimmedContent);
        }
        
        console.log('Comment submission result:', result);
        
        // Reset the form and image preview
        resetForm();
        setSelectedImage(null);
        setImagePreview(null);
        setError(null);
        onClose();
      } catch (err) {
        console.error('Error submitting comment:', err);
        setError('Failed to submit comment');
      }
    },
  });

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span>Add Comment</span>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            placeholder="Write your comment..."
            variant="outlined"
            name="content"
            {...formik.getFieldProps('content')}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />

          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-lg"
              />
              <IconButton
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-white"
                size="small"
              >
                <CloseIcon />
              </IconButton>
                </div>
          )}
        </DialogContent>

        <DialogActions className="p-4">
          <div className="flex flex-col w-full">
            {error && (
              <div className="text-red-500 text-sm mb-2 px-2">
                {error}
              </div>
            )}
            <div className="flex justify-between items-center w-full">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                <IconButton component="span" color="primary">
                  <ImageIcon />
                </IconButton>
              </label>

              <div className="flex space-x-2">
                <Button onClick={handleClose} color="inherit">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </div>
        </DialogActions>
                </form>
    </Dialog>
  );
};

export default ReplyModal;
