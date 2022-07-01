import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';
import { handleErrorText } from '../../../Utils/formValidation';

import './RegisterPage.css';

export default function RegisterPage() {
  const { register, handleSubmit, control } = useForm<UserModel>();
  const navigate = useNavigate();
  async function sendData(user: UserModel) {
    try {
      await authService.register(user);
      alert('You have been succesfully registered.');
      navigate('/vacations');
    } catch (error: any) {
      console.log(error);

      alert(error.response.data);
    }
  }
  const validationHandler = {
    username: handleErrorText('Please enter a username', 'Must be between 4-16 characters'),
    password: handleErrorText('Please enter a password', 'Must be between 4-16 characters'),
    firstName: handleErrorText('Please enter a password', 'Must be between 2-16 characters'),
    lastName: handleErrorText('Please enter a password', 'Must be between 2-16 characters'),
  };
  const theme = createTheme();

  return (
    <div>
      <div className="RegisterPage-header">
        <div className="RegisterPage-inner-header flex">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3} sx={{ borderRadius: '15px', paddingTop: 2, width: '400px', height: '570px' }}>
                <Box
                  sx={{
                    marginBottom: '30px',
                  }}
                >
                  <Typography component="h1" variant="h3" sx={{ color: '#404040' }}>
                    Register
                  </Typography>
                  <Typography component="h1" variant="subtitle1" sx={{ color: '#404040' }}>
                    Please fill out your info
                  </Typography>
                </Box>
                <CssBaseline />
                <Box
                  component="form"
                  onSubmit={handleSubmit(sendData)}
                  noValidate
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 2,
                        maxLength: 16,
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '340px',
                            marginBottom: '15px',
                            '&  .MuiFormHelperText-root.Mui-error': {
                              // styles for helper text error msg
                              position: 'absolute',
                              top: '55px',
                            },
                          }}
                          {...field}
                          {...register('firstName')}
                          type="text"
                          label="First Name"
                          error={error !== undefined}
                          helperText={error ? validationHandler.firstName(error.type) : ''}
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 2,
                        maxLength: 16,
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '340px',
                            marginBottom: '15px',
                            '&  .MuiFormHelperText-root.Mui-error': {
                              // styles for helper text error msg
                              position: 'absolute',
                              top: '55px',
                            },
                          }}
                          {...field}
                          {...register('lastName')}
                          type="text"
                          label="Last Name"
                          error={error !== undefined}
                          helperText={error ? validationHandler.lastName(error.type) : ''}
                        />
                      )}
                    />

                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 16,
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '340px',
                            marginBottom: '15px',
                            '&  .MuiFormHelperText-root.Mui-error': {
                              // styles for helper text error msg
                              position: 'absolute',
                              top: '55px',
                            },
                          }}
                          {...field}
                          {...register('username')}
                          type="text"
                          label="Username"
                          error={error !== undefined}
                          helperText={error ? validationHandler.username(error.type) : ''}
                        />
                      )}
                    />

                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 16,
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          sx={{
                            width: '340px',
                            marginBottom: '15px',
                            '&  .MuiFormHelperText-root.Mui-error': {
                              // styles for helper text error msg
                              position: 'absolute',
                              top: '55px',
                            },
                          }}
                          {...field}
                          {...register('password')}
                          type="password"
                          label="Password"
                          error={error !== undefined}
                          helperText={error ? validationHandler.password(error.type) : ''}
                        />
                      )}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      pb: 2,
                      padding: 2,
                      width: '85%',
                      background: 'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)',
                    }}
                  >
                    Register
                  </Button>

                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography component="span" variant="subtitle1" sx={{ color: '#404040', fontSize: '14px' }}>
                      Already a member? Login!
                    </Typography>
                  </Link>
                </Box>
              </Paper>
            </Container>
          </ThemeProvider>
        </div>

        {/* <!--Waves Container--> */}
        <div>
          <svg
            className="RegisterPage-waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="RegisterPage-parallax">
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
