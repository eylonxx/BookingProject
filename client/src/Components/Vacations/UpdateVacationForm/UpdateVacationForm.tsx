import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleErrorText } from '../../../Utils/formValidation';
import './UpdateVacationForm.css';
import store from '../../../Redux/Store';

export default function UpdateVacationForm() {
  const { register, handleSubmit, setValue, control } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();
  const sendData: SubmitHandler<VacationModel> = async (vacation) => {
    vacation.id = +params.id;
    if (vacation.image.length > 0) {
      vacation.image = vacation.image[0];
    }

    await vacationService.updateVacation(vacation);
    navigate('/vacations');
  };

  const validationHandler = {
    description: handleErrorText('Please enter a description', 'Must be between 4-255 characters'),
    destination: handleErrorText('Please enter a destination', 'Must be between 4-255 characters'),
    startingDate: handleErrorText('Please enter a date', 'Must be between 4-16 characters'),
    endingDate: handleErrorText('Please enter a date', 'Must be between 4-16 characters'),
    price: handleErrorText('Please enter a price', 'Must be between 0-100,000'),
  };

  useEffect(() => {
    const id: number = +params.id;
    const vacToUpdate = store.getState().vacationState.vacations.find((vac) => vac.id === id);
    setValue('description', vacToUpdate.description);
    setValue('destination', vacToUpdate.destination);
    setValue('startingDate', vacToUpdate.startingDate);
    setValue('endingDate', vacToUpdate.endingDate);
    setValue('price', vacToUpdate.price);
  }, []);

  const theme = createTheme();

  return (
    <div className="UpdateVacationForm">
      <div className="UpdateVacationForm-header">
        <div className="UpdateVacationForm-inner-header UpdateVacationForm-flex">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3} sx={{ borderRadius: '15px', paddingTop: 2, width: '400px', height: '700px' }}>
                <Box
                  sx={{
                    marginBottom: '15px',
                  }}
                >
                  <Typography component="h1" variant="h3" sx={{ color: '#404040' }}>
                    Edit a vacation
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
                      name="image"
                      control={control}
                      rules={{}}
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
                          onChange={(e: any) => {
                            console.log(e);
                          }}
                          label="Image"
                          InputLabelProps={{ shrink: true }}
                          error={error !== undefined}
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
                          InputLabelProps={{ shrink: true }}
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
                          InputLabelProps={{ shrink: true }}
                          label="Ending date"
                          error={error !== undefined}
                          helperText={error ? validationHandler.endingDate(error.type) : ''}
                        />
                      )}
                    />
                    <Controller
                      name="price"
                      control={control}
                      defaultValue={0}
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
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <label>Description:</label>
    //   <input {...register('description')} />
    //   <label>Destination:</label>
    //   <input {...register('destination')} />
    //   <label>imageName:</label>
    //   <input {...register('imageName')} />
    //   <label>Starting Date:</label>
    //   <input type="date" {...register('startingDate')} />
    //   <label>endingDate:</label>
    //   <input type="date" {...register('endingDate')} />
    //   <label>Price:</label>
    //   <input {...register('price')} />
    //   <button>Submit</button>
    // </form>
  );
}
