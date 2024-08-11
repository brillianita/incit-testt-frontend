
import { useState } from 'react';
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
export default function EditName(props) {
  // PUT Name
  const updateName = async (data) => {
    const response = await fetch(`http://localhost:3300/users/edit-name/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if (responseData.status === 'fail') {
      alert(responseData.message)
    } else {
      alert('Name updated successfully')
    }
  }
  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const { mutate } = useMutation(updateName);
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const {email, name} = props;
  const [newName, setNewName] = useState(null);
  // const cookie = document.cookie;
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  const id = getCookie('id');
  

  function handleNewNameChange(e) {
    setNewName(e.target.value);
  }

  const onSubmit = (data) => {
    const user = {
      ...data
    };

    mutate(user)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 20 }}>
        <Typography variant="h6" fontWeight='bold' gutterBottom align="center">
          Edit Profile
        </Typography>
        <Box
        >
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                disabled
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                id="email"
                name="email"
              />
              <TextField
                label="Name"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newName}
                onChange={handleNewNameChange}
                id="name"
                name="name"
                {...register('name')}
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