import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {
  TextField,
  Typography,
  Grid,
  Link as LinkMui,
  Container,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
// import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
const theme = createTheme({
  palette: {
    primary: {
      main: '#053B50',
    },
  },
});
export default function SignUp() {
  // Register By Email
  const createUser = async (data) => {
    const response = await fetch('http://localhost:3300/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json();

    if (responseData.status === 'fail') {
      alert(responseData.message);
    } else {
      alert('We send you a verification email. Please verify your email before login');
      return responseData;
    }
  }

  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  })
  const { mutate, isLoading } = useMutation(createUser);
  const onSubmit = (data) => {
    const user = {
      ...data
    };
    mutate(user)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                id="confirmPassword"
                name="confirmPassword"
                {...register('confirmPassword')}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 3, textTransform: 'capitalize', mb: 3 }}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Sign Up'}
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
              or
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

              <Button
                component={Link} to={'http://localhost:3300/auth/google'}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#fff', color: '#000', mr: 3, '&:hover': {
                    backgroundColor: '#f1f1f1'
                  },
                }}
              >
                <Avatar alt="Google Icon" src={google} sx={{ width: 24, height: 24, marginRight: 3 }} />
                <Typography sx={{ textTransform: 'capitalize' }}>Sign Up With Google</Typography>
              </Button>
              <Button
                component={Link} to={'http://localhost:3300/auth/facebook'}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#fff', color: '#000', '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
              >
                <Avatar alt="Facebook Icon" src={facebook} sx={{ width: 24, height: 24, marginRight: 3 }} />
                <Typography sx={{ textTransform: 'capitalize' }}>Sign Up With Facebook</Typography>
              </Button>
            </Box>
            <LinkMui
              component={Link}
              to="/login"
              variant="body2"
              sx={{ display: 'block', textAlign: 'center', mt: 2 }}
            >
              Already have account? SignIn
            </LinkMui>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}