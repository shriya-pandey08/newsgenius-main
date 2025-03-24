import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  Alert,
  Grid,
  Typography,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../config/api.config';
import { AuthContext } from '../../App';
import './Auth.css';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const urlRegExp = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  role: Yup.string()
    .required('Role is required')
    .oneOf(['USER', 'REPORTER', 'CHANNEL'], 'Invalid role selected'),
  channelName: Yup.string()
    .when('role', {
      is: (val) => val === 'CHANNEL',
      then: (schema) => schema.required('Channel name is required for channel accounts'),
      otherwise: (schema) => schema
    }),
  bio: Yup.string()
    .when('role', {
      is: (val) => ['REPORTER', 'CHANNEL'].includes(val),
      then: (schema) => schema
        .required('Bio is required for reporters and channels')
        .min(10, 'Bio must be at least 10 characters')
        .max(500, 'Bio cannot exceed 500 characters'),
      otherwise: (schema) => schema
    }),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .nullable(),
  location: Yup.string()
    .max(100, 'Location cannot exceed 100 characters')
    .nullable(),
  website: Yup.string()
    .matches(urlRegExp, 'Website URL is not valid')
    .nullable(),
});

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadNote, setUploadNote] = useState('');
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: '',
      channelName: '',
      bio: '',
      mobile: '',
      location: '',
      website: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setIsSubmitting(true);
    setError('');
      setSuccess('');
      setUploadNote('');

      // Show note about image uploads if files were selected
      if (profileImage || backgroundImage) {
        setUploadNote('Note: Image uploads will be processed separately after account creation.');
    }

    try {
        console.log('Submitting signup form with values:', values);
        
        const signupData = {
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role,
          ...(values.channelName && { channelName: values.channelName }),
          ...(values.bio && { bio: values.bio }),
          ...(values.mobile && { mobile: values.mobile }),
          ...(values.location && { location: values.location }),
          ...(values.website && { website: values.website })
          // Image uploads are handled separately now
        };

        console.log('Sending signup request with data:', signupData);
        
        const response = await authAPI.signup(signupData);
        console.log('Signup response:', response);

        if (response.data && (response.data.token || response.data.jwt)) {
          setSuccess('Account created successfully!');
          const token = response.data.token || response.data.jwt;
          localStorage.setItem('token', token);
          
          const userRole = values.role.toLowerCase();
          const userId = response.data.userId || response.data.id;
          const userName = values.username;
          
          localStorage.setItem('userRole', userRole);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          
          // Set user in context
          login({
            id: userId,
            role: userRole,
            name: userName
          });
          
          // Clear form
          resetForm();
          setProfileImage(null);
          setBackgroundImage(null);
          
          // Redirect after a short delay to show success message
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          console.error('Invalid response format:', response);
          setError('Unexpected response format from server');
        }
      } catch (err) {
        console.error('Signup error:', err);
        console.error('Error response:', err.response);
        
        let errorMessage = 'Registration failed. Please try again.';
        
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        } else if (typeof err.response?.data === 'string') {
          errorMessage = err.response.data;
        }
        
        // Handle specific error cases
        if (errorMessage.includes('already') && errorMessage.includes('email')) {
          errorMessage = 'This email is already registered. Please use a different email or login to your existing account.';
        } else if (errorMessage.includes('validation')) {
          errorMessage = 'Please check your inputs and try again.';
        }
        
        // Show more technical details during development
        if (process.env.NODE_ENV === 'development') {
          console.error('Error details:', err);
          if (err.response?.data) {
            console.error('Server response:', err.response.data);
          }
        }
        
        setError(errorMessage);
      } finally {
        setSubmitting(false);
        setIsSubmitting(false);
      }
    },
  });

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage(file);
    }
  };

  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    if (email && !formik.errors.email) {
      try {
        // You might want to add an API endpoint to check email availability
        // const response = await authAPI.checkEmail(email);
        // if (!response.data.available) {
        //   formik.setFieldError('email', 'This email is already registered');
        // }
      } catch (err) {
        console.error('Error checking email:', err);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Account</h2>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}
        
        {uploadNote && (
          <Alert severity="info" className="mb-4">
            {uploadNote}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Full Name"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps('username')}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item xs={12}>
      <TextField
        fullWidth
                id="email"
                name="email"
        label="Email"
        variant="outlined"
                margin="normal"
                type="email"
                {...formik.getFieldProps('email')}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  handleEmailBlur(e);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                margin="normal"
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  label="Role"
                  {...formik.getFieldProps('role')}
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="REPORTER">Reporter</MenuItem>
                  <MenuItem value="CHANNEL">Channel</MenuItem>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <FormHelperText>{formik.errors.role}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {formik.values.role === 'CHANNEL' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="channelName"
                  name="channelName"
                  label="Channel Name"
                  variant="outlined"
                  margin="normal"
                  {...formik.getFieldProps('channelName')}
                  error={formik.touched.channelName && Boolean(formik.errors.channelName)}
                  helperText={formik.touched.channelName && formik.errors.channelName}
                />
              </Grid>
            )}

            {['REPORTER', 'CHANNEL'].includes(formik.values.role) && (
              <Grid item xs={12}>
      <TextField
        fullWidth
                  id="bio"
                  name="bio"
                  label="Bio"
        variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  {...formik.getFieldProps('bio')}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={
                    (formik.touched.bio && formik.errors.bio) ||
                    'Provide a brief description about yourself or your channel'
                  }
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider>
                <Typography variant="body2" color="textSecondary">
                  Additional Information (Optional)
                </Typography>
              </Divider>
            </Grid>

            <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
                id="mobile"
                name="mobile"
                label="Mobile Number"
        variant="outlined"
                margin="normal"
                {...formik.getFieldProps('mobile')}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
                id="location"
                name="location"
                label="Location"
        variant="outlined"
                margin="normal"
                {...formik.getFieldProps('location')}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
      <TextField
        fullWidth
                id="website"
                name="website"
                label="Website"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps('website')}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="image-upload-container">
                <input
                  accept="image/*"
                  id="profile-image-upload"
                  type="file"
                  hidden
                  onChange={handleProfileImageChange}
                />
                <label htmlFor="profile-image-upload">
                  <Button
        variant="outlined"
                    component="span"
                    fullWidth
                    startIcon={<PhotoCameraIcon />}
                  >
                    {profileImage ? 'Change Profile Image' : 'Upload Profile Image'}
                  </Button>
                </label>
                {profileImage && (
                  <Typography variant="caption" display="block" gutterBottom>
                    {profileImage.name}
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary">
                  * Image uploads available after account creation
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="image-upload-container">
                <input
                  accept="image/*"
                  id="background-image-upload"
                  type="file"
                  hidden
                  onChange={handleBackgroundImageChange}
                />
                <label htmlFor="background-image-upload">
      <Button
                    variant="outlined"
                    component="span"
        fullWidth
                    startIcon={<PhotoCameraIcon />}
                  >
                    {backgroundImage ? 'Change Cover Image' : 'Upload Cover Image'}
                  </Button>
                </label>
                {backgroundImage && (
                  <Typography variant="caption" display="block" gutterBottom>
                    {backgroundImage.name}
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary">
                  * Image uploads available after account creation
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
        variant="contained"
        color="primary"
                fullWidth
                size="large"
                className="submit-button"
                disabled={formik.isSubmitting || isSubmitting}
              >
                {(formik.isSubmitting || isSubmitting) ? 'Creating Account...' : 'Create Account'}
      </Button>

              <div className="auth-links">
                <p>Already have an account? 
      <Button
                    color="primary" 
                    onClick={() => navigate('/auth')}
                    sx={{ textTransform: 'none', ml: 1 }}
                  >
                    Login
      </Button>
                </p>
              </div>
            </Grid>
          </Grid>
    </form>
      </div>
    </div>
  );
};

export default Signup;
