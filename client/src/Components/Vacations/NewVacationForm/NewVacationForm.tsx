import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/vacationModel';
import socketService from '../../../Services/SocketService';
import vacationService from '../../../Services/VacationService';
import { handleErrorText } from '../../../Utils/formValidation';
import notyfConfig from '../../../Utils/notyf';
import './NewVacationForm.css';

export default function NewVacationForm() {
  const { register, handleSubmit, control } = useForm<VacationModel>();
  const navigate = useNavigate();
  const [startingDate, setStartingDate] = useState('');
  const sendData: SubmitHandler<VacationModel> = async (vacation) => {
    vacation.followers = 0;
    vacation.image = vacation.image[0];
    await vacationService.createVacation(vacation);
    socketService.notifyServer();
    notyfConfig.success('Created a new vacation!');

    navigate('/vacations');
  };

  const validationHandler = {
    description: handleErrorText('Please enter a description', 'Must be between 4-255 characters'),
    destination: handleErrorText('Please enter a destination', 'Must be between 4-255 characters'),
    image: handleErrorText('Please upload an image'),
    startingDate: handleErrorText('Please enter a date', '', 'Invalid starting date'),
    endingDate: handleErrorText('Please enter a date', '', 'Ending date must be after starting date'),
    price: handleErrorText('Please enter a price', 'Must be between 0-100,000'),
  };

  const theme = createTheme();

  return (
    <div>
      <div className="NewVacationForm-header">
        <div className="NewVacationForm-inner-header NewVacationForm-flex">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3} sx={{ borderRadius: '15px', paddingTop: 2, width: '400px', height: '700px' }}>
                <Box
                  sx={{
                    marginBottom: '15px',
                  }}
                >
                  <Typography component="h1" variant="h3" sx={{ color: '#404040' }}>
                    New vacation
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
                          multiline
                          rows={2}
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
                      name="image"
                      control={control}
                      rules={{
                        required: true,
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
                          {...register('image')}
                          type="file"
                          onChange={(e: any) => {}}
                          label="Image"
                          InputLabelProps={{ shrink: true }}
                          error={error !== undefined}
                          helperText={error ? validationHandler.image(error.type) : ''}
                        >
                          <input type="file" />
                        </TextField>
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
                        validate: (value) => {
                          let startDate = Date.parse(value);
                          let now = new Date().getTime();
                          return startDate >= now;
                        },
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
                          onChange={(e) => {
                            setStartingDate(e.target.value);
                            field.onChange(e);
                          }}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
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
                        validate: (value) => {
                          let startDate = Date.parse(startingDate);
                          let endDate = Date.parse(value);
                          // validate date logic
                          return startDate <= endDate;
                        },
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
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
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
                        min: 0,
                        max: 100000,
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
                          onChange={(e) => {}}
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
                    Create
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
