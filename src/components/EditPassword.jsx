import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
  TextField,
  Typography,
  Grid,
  Container,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#053B50',
    },
  },
});
export default function EditPassword() {
  // const cookie = document.cookie;
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  const id = getCookie('id');
  const updatePassword = async (data) => {
    console.log('data update', data);
    console.log('id update', id)
    console.log('json stringfy', JSON.stringify(data))
    const response = await fetch(`http://localhost:3300/users/edit-password/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log('responseData', responseData)
    if (responseData.status === 'fail') {
      alert(responseData.message)
    } else {
      alert('Password updated successfully')
    }
  }
  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const { mutate } = useMutation(updatePassword);
  const onSubmit = (data) => {
    const user = {
      ...data
    };
    console.log('user mutate', user)
    mutate(user)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Typography variant="h6" fontWeight='bold' gutterBottom align="center">
          Reset Password
        </Typography>
        <Box
        >
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Old Password"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                id="oldPassword"
                name="oldPassword"
                {...register('oldPassword')}
              />
              <TextField
                label="New Password"
                type='password'
                variant="outlined"
                fullWidth
                margin="normal"
                id="password"
                name="password"
                {...register('password')}
              />
              <TextField
                label="Confirm Password"
                type='password'
                variant="outlined"
                fullWidth
                margin="normal"
                id="confirmPassword"
                name="confirmPassword"
                {...register('confirmPassword')}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  mt: 3,
                  textTransform: 'capitalize',
                  mb: 3,
                  ml: 'auto',
                  mr: 0,
                  float: 'right'
                }}
              >
                Update
              </Button>
            </form>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}