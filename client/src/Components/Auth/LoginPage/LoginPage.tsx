import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/credentialsModel';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';

import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LoginPage.css';

export default function LoginPage() {
  const { register, handleSubmit, reset, control } = useForm<UserModel>();
  const navigate = useNavigate();

  async function sendData(user: CredentialsModel) {
    try {
      await authService.login(user);
      reset();
      alert('You have been succesfully logged in.');
      navigate('/vacations');
    } catch (e: any) {
      reset();
      alert(e);
    }
  }
  const myHelper = {
    username: {
      required: 'Please enter a username',
    },
    password: {
      required: 'Please enter a password',
    },
  };

  const theme = createTheme();

  return (
    <div>
      <div className="header">
        <div className="inner-header flex">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3}>
                <CssBaseline />
                <Box
                  component="form"
                  onSubmit={handleSubmit(sendData)}
                  noValidate
                  sx={{
                    mt: 1,
                    gap: '10px',
                    display: 'flex',
                    borderRadius: '16px',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '400px',
                    height: '400px',
                  }}
                >
                  <Typography component="h1" variant="h3" sx={{ color: '#404040' }}>
                    Login
                  </Typography>
                  <Typography component="h1" variant="subtitle1" sx={{ color: '#404040' }}>
                    Enter your credentials
                  </Typography>

                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        sx={{
                          marginTop: '20px',
                          width: '85%',
                        }}
                        {...field}
                        {...register('username')}
                        type="text"
                        label="Username"
                        error={error !== undefined}
                        helperText={error ? myHelper.username.required : ''}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        sx={{
                          width: '85%',
                        }}
                        {...field}
                        {...register('password')}
                        type="text"
                        label="Password"
                        error={error !== undefined}
                        helperText={error ? myHelper.password.required : ''}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      padding: 2,
                      width: '85%',
                      background: 'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)',
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Paper>
            </Container>
          </ThemeProvider>
          {/* <!--Content before waves--> */}
        </div>

        {/* <!--Waves Container--> */}
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
        {/* <!--Waves end--> */}
      </div>
      {/* // <!--Header ends--> */}

      {/* // <!--Content starts--> */}
    </div>
  );
}
