import React, { useState, useContext } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../config/api.config';
import { AuthContext } from '../../App';
import './Auth.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError('');
        console.log('Submitting login form with values:', values);
        
        const response = await authAPI.login({
          email: values.email,
          password: values.password
        });
        
        console.log('Login response:', response);

        if (response.data && (response.data.token || response.data.jwt)) {
          const token = response.data.token || response.data.jwt;
          localStorage.setItem('token', token);
          
          // Store user role and ID
          const userRole = response.data.role || 'user';
          const userId = response.data.userId || response.data.id;
          const userName = response.data.name || values.email.split('@')[0];
          
          localStorage.setItem('userRole', userRole.toLowerCase());
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          
          // Set user in context
          login({
            id: userId,
            role: userRole.toLowerCase(),
            name: userName
          });
          
          // Redirect to home page - this is now handled by the login function
          // navigate('/');
        } else {
          console.error('Invalid response format:', response);
          setError('Unexpected response format from server');
        }
      } catch (err) {
        console.error('Login error:', err);
        
        let errorMessage = 'Login failed. Please check your credentials and try again.';
        
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.status === 401) {
          errorMessage = 'Invalid email or password';
        }
        
        setError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login to Your Account</h2>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="submit-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="auth-links">
            <p>Don't have an account? 
              <Button 
                color="primary" 
                onClick={() => navigate('/auth/signup')}
                sx={{ textTransform: 'none', ml: 1 }}
              >
                Sign Up
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
