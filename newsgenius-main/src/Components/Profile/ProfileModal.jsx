import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Alert, Avatar, CircularProgress, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ProfileModal.css';
import { userAPI } from '../../config/api.config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outine:"none",
  borderRadius:4  
};

export default function ProfileModal({open, handleClose, profile, onProfileUpdate}) {
  const [uploading, setUploading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [previewProfileImage, setPreviewProfileImage] = React.useState(null);
  const [previewCoverImage, setPreviewCoverImage] = React.useState(null);

  // Initialize form with current profile data
  const formik = useFormik({
    initialValues: {
      fullName: profile?.name || "",
      website: profile?.website || "",
      location: profile?.location || "",
      bio: profile?.bio || "",
      backgroundImage: null,
      image: null
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });
   
  // Reset state when modal is closed
  React.useEffect(() => {
    if (!open) {
      setPreviewProfileImage(null);
      setPreviewCoverImage(null);
      setError('');
      setSuccess('');
    } else {
      // Reset form values when modal opens
      formik.resetForm({
        values: {
          fullName: profile?.name || "",
          website: profile?.website || "",
          location: profile?.location || "",
          bio: profile?.bio || "",
          backgroundImage: null,
          image: null
        }
      });
      
      // Set preview images if profile has them
      if (profile?.image && typeof profile.image === 'string') {
        setPreviewProfileImage(profile.image);
      }
      
      if (profile?.backgroundImage && typeof profile.backgroundImage === 'string') {
        setPreviewCoverImage(profile.backgroundImage);
      }
    }
  }, [open, profile]);

  async function handleSubmit(values) {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Create request data with text fields and base64 image data
      const requestData = {
        name: values.fullName,
        bio: values.bio || '',
        location: values.location || '',
        website: values.website || ''
      };
      
      // Add image data if present
      if (values.image) {
        requestData.image = values.image;
      } else if (profile?.image && typeof profile.image === 'string') {
        // Keep existing image if no new one was uploaded
        requestData.image = profile.image;
      }
      
      if (values.backgroundImage) {
        requestData.backgroundImage = values.backgroundImage;
      } else if (profile?.backgroundImage && typeof profile.backgroundImage === 'string') {
        // Keep existing background image if no new one was uploaded
        requestData.backgroundImage = profile.backgroundImage;
      }
      
      // Send the update to the API
      const response = await userAPI.updateProfile(requestData);
      
      setSuccess('Profile updated successfully!');
      
      // If the parent component provided an update callback, call it
      if (onProfileUpdate) {
        // Create an updated profile object
        const updatedProfile = {
          ...profile,
          name: values.fullName,
          bio: values.bio || '',
          location: values.location || '',
          website: values.website || ''
        };
        
        // If new images were uploaded, update the image URLs
        if (values.image) {
          updatedProfile.image = values.image;
        }
        
        if (values.backgroundImage) {
          updatedProfile.backgroundImage = values.backgroundImage;
        }
        
        onProfileUpdate(updatedProfile);
      }
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      let errorMessage = 'Failed to update profile. Please try again.';
      
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
        
        if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.status === 404) {
          errorMessage = 'Profile update endpoint not found. Please contact support.';
        } else if (err.response.status === 403) {
          errorMessage = 'You do not have permission to update this profile.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  const handleImageChange = (event) => {
   setUploading(true);
    const { name } = event.target;
   const file = event.target.files[0];
    
    if (file) {
      // Create a URL for preview
      const previewUrl = URL.createObjectURL(file);
      
      // Update preview based on image type
      if (name === 'image') {
        setPreviewProfileImage(previewUrl);
      } else if (name === 'backgroundImage') {
        setPreviewCoverImage(previewUrl);
      }
      
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store base64 string in formik values
        formik.setFieldValue(name, reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
   setUploading(false);
  }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
               <IconButton onClick={handleClose} aria-label="delete">
               <CloseIcon />
               </IconButton>
       <p className='text-sm'>Edit Profile</p>
                </div>
              <Button 
                type='submit' 
                variant="contained" 
                disabled={uploading || saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>  
            </div>
            
            {error && (
              <Alert severity="error" className="mt-2 mb-2">
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" className="mt-2 mb-2">
                {success}
              </Alert>
            )}
            
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className='relative'>
                    <img 
                      className='w-full h-[12rem] object-cover object-center'
                      src={previewCoverImage || profile?.backgroundImage || 'https://cdn.pixabay.com/photo/2021/07/02/00/20/woman-6380562_640.jpg'}
                      alt='Cover'
                    />
                    <input 
                      type="file"
                      accept="image/*"
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                    onChange={handleImageChange}
                      name="backgroundImage" 
                    />
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <CircularProgress size={24} color="info" />
                      </div>
                    )}
                  </div>
                 </div>
                 <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                  <div className='relative'>
                    <Avatar
                      sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
                      src={previewProfileImage || profile?.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'}
                    />
                    <input
                    className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                      accept="image/*"
                    name="image" 
                      type="file" 
                    />
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <CircularProgress size={24} color="info" />
                      </div>
                    )}
                  </div>
                 </div>
              </React.Fragment>

              <div className='space-y-3'>
                 <TextField
                 fullWidth
                 id='fullName'
                 name='fullName'
                 label="Full Name"
                 value={formik.values.fullName}
                 onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                 helperText={formik.touched.fullName && formik.errors.fullName}
                 />
                 
                 <TextField
                 fullWidth
                 multiline
                 rows={4}
                 id='bio'
                 name='bio'
                 label="Bio"
                 value={formik.values.bio}
                 onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                 helperText={formik.touched.bio && formik.errors.bio}
                 />
                
                 <TextField
                 fullWidth
                 id='website'
                 name='website'
                 label="Website"
                 value={formik.values.website}
                 onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                 helperText={formik.touched.website && formik.errors.website}
                 />
                 
                 <TextField
                 fullWidth
                 id='location'
                 name='location'
                 label="Location"
                 value={formik.values.location}
                 onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                 helperText={formik.touched.location && formik.errors.location}
                 />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

  


