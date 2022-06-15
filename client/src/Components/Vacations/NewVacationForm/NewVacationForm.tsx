import React from 'react';
import { Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleErrorText } from '../../../Utils/formValidation';

export default function NewVacationForm() {
  const { register, handleSubmit, control } = useForm<VacationModel>();
  const navigate = useNavigate();
  const sendData: SubmitHandler<VacationModel> = async (vacation) => {
    await vacationService.createVacation(vacation);
    navigate('/vacations');
  };

  const validationHandler = {
    description: handleErrorText('Please enter a description', 'Must be between 4-16 characters'),
    destination: handleErrorText('Please enter a destination', 'Must be between 4-16 characters'),
    imageName: handleErrorText('Please upload an image', 'Must be between 4-16 characters'),
    startingDate: handleErrorText('Please enter a date', 'Must be between 4-16 characters'),
    endingDate: handleErrorText('Please enter a date', 'Must be between 4-16 characters'),
    price: handleErrorText('Please enter a price', 'Must be between 4-16 characters'),
  };

  const theme = createTheme();

  return (
    <div>
      <div className="header">
        <div className="inner-header flex">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3} sx={{ borderRadius: '15px', paddingTop: 2, width: '400px', height: '600px' }}>
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
                      name="description"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 255,
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
                          {...register('description')}
                          type="text"
                          label="Description"
                          error={error !== undefined}
                          helperText={error ? validationHandler.description(error.type) : ''}
                        />
                      )}
                    />

                    <Controller
                      name="destination"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 255,
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
                          {...register('destination')}
                          type="text"
                          label="Destination"
                          error={error !== undefined}
                          helperText={error ? validationHandler.destination(error.type) : ''}
                        />
                      )}
                    />
                    <Controller
                      name="imageName"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 255,
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
                          {...register('imageName')}
                          type="text"
                          label="Image Name"
                          error={error !== undefined}
                          helperText={error ? validationHandler.imageName(error.type) : ''}
                        />
                      )}
                    />

                    <Controller
                      name="startingDate"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 255,
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
                          {...register('startingDate')}
                          type="date"
                          label="Starting date"
                          error={error !== undefined}
                          helperText={error ? validationHandler.startingDate(error.type) : ''}
                        />
                      )}
                    />

                    <Controller
                      name="endingDate"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 255,
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
                          {...register('endingDate')}
                          type="date"
                          label="Ending date"
                          error={error !== undefined}
                          helperText={error ? validationHandler.endingDate(error.type) : ''}
                        />
                      )}
                    />
                    <Controller
                      name="price"
                      control={control}
                      rules={{
                        required: true,
                        minLength: 4,
                        maxLength: 255,
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
                          {...register('price')}
                          type="number"
                          label="Price"
                          error={error !== undefined}
                          helperText={error ? validationHandler.price(error.type) : ''}
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
                </Box>
              </Paper>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
