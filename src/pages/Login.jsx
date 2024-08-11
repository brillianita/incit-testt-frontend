import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {
  TextField,
  Typography,
  Link as LinkMui,
  Grid,
  Container,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const theme = createTheme({
  palette: {
    primary: {
      main: '#053B50',
    },
  },
});
export default function Login() {
  const navigate = useNavigate();

  const loginByEmailPass = async (data) => {
    const response = await fetch('http://localhost:3300/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if (responseData.status === 'fail') {
      alert(responseData.message)
    } else {
      navigate('/dashboard', { replace: true });
    }
  }

  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const { mutate, isLoading } = useMutation(loginByEmailPass);
  const onSubmit = (data) => {
    const user = {
      ...data
    };
    mutate(user)
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ mt: 10 }} >
          <Typography variant="h4" fontWeight='bold' gutterBottom align="center">
            Welcome to Simple Dashboard
          </Typography>
          <Box
          >
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  id="email"
                  name="email"
                  {...register('email')}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  id="password"
                  name="password"
                  {...register('password')}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, textTransform: 'capitalize', mb: 3 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                or
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link} to={'http://localhost:3300/auth/google'}
                  onClick={() => console.log('Login with Google')}
                  sx={{
                    backgroundColor: '#fff', color: '#000', mr: 3, '&:hover': {
                      backgroundColor: '#f1f1f1'
                    },
                  }}
                >
                  <Avatar alt="Google Icon" src={google} sx={{ width: 24, height: 24, marginRight: 3 }} />
                  <Typography sx={{ textTransform: 'capitalize' }}>Login With Google</Typography>
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link} to={'http://localhost:3300/auth/facebook'}
                  sx={{
                    backgroundColor: '#fff', color: '#000', '&:hover': {
                      backgroundColor: '#f1f1f1'
                    }
                  }}
                >
                  <Avatar alt="Facebook Icon" src={facebook} sx={{ width: 24, height: 24, marginRight: 3 }} />
                  <Typography sx={{ textTransform: 'capitalize' }}>Login With Facebook</Typography>
                </Button>
              </Box>
              <LinkMui
                component={Link}
                to="/signup"
                variant="body2"
                sx={{ display: 'block', textAlign: 'center', mt: 2 }}
              >
                Don&apos;t have an account? Sign up
              </LinkMui>
            </Grid>
          </Box>
        </Container >
      </ThemeProvider >
    </>
  )
}