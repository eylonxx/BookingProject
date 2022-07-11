import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Notyf } from 'notyf';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/credentialsModel';
import UserModel from '../../../Models/userModel';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import { handleErrorText } from '../../../Utils/formValidation';
import notyfConfig from '../../../Utils/notyf';
import './LoginPage.css';

export default function LoginPage() {
  const { register, handleSubmit, reset, control } = useForm<UserModel>();
  const navigate = useNavigate();

  async function sendData(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      reset();
      notyfConfig.success('Logged in!');
      //success notification
      navigate('/vacations');
    } catch (e: any) {
      reset();
      notyfConfig.error(e.response.data);
    }
  }

  useEffect(() => {
    if (store.getState().authState.user) navigate('/vacations');
    //if already logged in, go to vacation
  }, []);

  const validationHandler = {
    username: handleErrorText('Please enter a username', 'Must be between 4-16 characters'),
    password: handleErrorText('Please enter a password', 'Must be between 4-16 characters'),
  };

  const theme = createTheme();

  return (
    <div>
      <div className="LoginPage-header">
        <div className="LoginPage-inner-header LoginPage-flex">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3} sx={{ borderRadius: '15px', paddingTop: 2, width: '400px', height: '420px' }}>
                <Box
                  sx={{
                    marginBottom: '15px',
                  }}
                >
                  <Typography component="h1" variant="h3" sx={{ color: '#404040' }}>
                    Login
                  </Typography>
                  <Typography component="h1" variant="subtitle1" sx={{ color: '#404040' }}>
                    Enter your credentials
                  </Typography>
                </Box>
                <CssBaseline />
                <Box
                  component="form"
                  onSubmit={handleSubmit(sendData)}
                  noValidate
                  sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                          }}
                          {...field}
                          {...register('password')}
                          type="password"
                          label="Password"
                          error={error !== undefined}
                          helperText={error ? validationHandler.password(error.type) : ' '}
                        />
                      )}
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      padding: 2,
                      width: '85%',
                      background: 'linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)',
                    }}
                  >
                    Login
                  </Button>

                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Typography component="span" variant="subtitle1" sx={{ color: '#404040', fontSize: '14px' }}>
                      Not a member? Register now!
                    </Typography>
                  </Link>
                </Box>
              </Paper>
            </Container>
          </ThemeProvider>
          {/* <!--Content before waves--> */}
        </div>

        {/* <!--Waves Container--> */}
        <div>
          <svg
            className="LoginPage-waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="LoginPage-parallax">
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
