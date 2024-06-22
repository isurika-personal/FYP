import React, { useState } from 'react';
import { TextField, Button, Grid, Divider, CircularProgress } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MainCard from 'components/MainCard';
// import config from '../../config';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

const AddForm = () => {
  const [submitting, setSubmitting] = useState(false);

  // const Toast = withReactContent(
  //   Swal.mixin({
  //     toast: true,
  //     position: 'bottom',
  //     customClass: {
  //       popup: 'colored-toast'
  //     },
  //     background: 'primary',
  //     showConfirmButton: false,
  //     timer: 3500,
  //     timerProgressBar: true
  //   })
  // );
  //
  // const showSuccessSwal = (e) => {
  //   Toast.fire({
  //     icon: 'success',
  //     title: e
  //   });
  // };

  // const showErrorSwal = (e) => {
  //   Toast.fire({
  //     icon: 'error',
  //     title: e
  //   });
  // };

  const initialValues = {
    hotel: '',
    arrival_date_month: '',
    stays_in_weekend_nights: '',
    stays_in_week_nights: '',
    adults: '',
    children: '',
    babies: '',
    meal: '',
    country: '',
    market_segment: '',
    distribution_channel: '',
    is_repeated_guest: '',
    previous_cancellations: '',
    reserved_room_type: '',
    booking_changes: '',
    customer_type: '',
    adr: '',
    required_car_parking_spaces: '',
    total_of_special_requests: ''
  };

  const validationSchema = Yup.object().shape({
    hotel: Yup.string().required('Hotel is required'),
    arrival_date_month: Yup.string().required('Arrival Date Month is required'),
    stays_in_weekend_nights: Yup.number().required('Stays in Weekend Nights is required').integer('Please enter a valid integer'),
    stays_in_week_nights: Yup.number().required('Stays in Week Nights is required').integer('Please enter a valid integer'),
    adults: Yup.number().required('Adults is required').integer('Please enter a valid integer'),
    children: Yup.number().required('Children is required').typeError('Please enter a valid number'),
    babies: Yup.number().required('Babies is required').integer('Please enter a valid integer'),
    meal: Yup.string().required('Meal is required'),
    country: Yup.string().required('Country is required'),
    market_segment: Yup.string().required('Market Segment is required'),
    distribution_channel: Yup.string().required('Distribution Channel is required'),
    is_repeated_guest: Yup.number().required('Is Repeated Guest is required').integer('Please enter a valid integer'),
    previous_cancellations: Yup.number().required('Previous Cancellations is required').integer('Please enter a valid integer'),
    reserved_room_type: Yup.string().required('Reserved Room Type is required'),
    booking_changes: Yup.number().required('Booking Changes is required').integer('Please enter a valid integer'),
    customer_type: Yup.string().required('Customer Type is required'),
    adr: Yup.number().required('ADR is required').typeError('Please enter a valid number'),
    required_car_parking_spaces: Yup.number().required('Required Car Parking Spaces is required').integer('Please enter a valid integer'),
    total_of_special_requests: Yup.number().required('Total of Special Requests is required').integer('Please enter a valid integer')
  });

  const handleSubmit = (values) => {
    setSubmitting(true);
    console.log('Submitted:', values);
    setSubmitting(false);
  };

  return (
    <MainCard title="Enter Customer Details Here">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, handleSubmit, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container direction="column" justifyContent="center">
              <Grid container sx={{ p: 3 }} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Hotel"
                    variant="outlined"
                    name="hotel"
                    fullWidth
                    error={touched.hotel && !!errors.hotel}
                    helperText={<ErrorMessage name="hotel" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Arrival Date Month"
                    variant="outlined"
                    name="arrival_date_month"
                    fullWidth
                    error={touched.arrival_date_month && !!errors.arrival_date_month}
                    helperText={<ErrorMessage name="arrival_date_month" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Stays in Weekend Nights"
                    variant="outlined"
                    type="number"
                    name="stays_in_weekend_nights"
                    fullWidth
                    error={touched.stays_in_weekend_nights && !!errors.stays_in_weekend_nights}
                    helperText={<ErrorMessage name="stays_in_weekend_nights" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Stays in Week Nights"
                    variant="outlined"
                    type="number"
                    name="stays_in_week_nights"
                    fullWidth
                    error={touched.stays_in_week_nights && !!errors.stays_in_week_nights}
                    helperText={<ErrorMessage name="stays_in_week_nights" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Adults"
                    variant="outlined"
                    type="number"
                    name="adults"
                    fullWidth
                    error={touched.adults && !!errors.adults}
                    helperText={<ErrorMessage name="adults" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Children"
                    variant="outlined"
                    type="number"
                    name="children"
                    fullWidth
                    error={touched.children && !!errors.children}
                    helperText={<ErrorMessage name="children" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Babies"
                    variant="outlined"
                    type="number"
                    name="babies"
                    fullWidth
                    error={touched.babies && !!errors.babies}
                    helperText={<ErrorMessage name="babies" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Meal"
                    variant="outlined"
                    name="meal"
                    fullWidth
                    error={touched.meal && !!errors.meal}
                    helperText={<ErrorMessage name="meal" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Country"
                    variant="outlined"
                    name="country"
                    fullWidth
                    error={touched.country && !!errors.country}
                    helperText={<ErrorMessage name="country" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Market Segment"
                    variant="outlined"
                    name="market_segment"
                    fullWidth
                    error={touched.market_segment && !!errors.market_segment}
                    helperText={<ErrorMessage name="market_segment" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Distribution Channel"
                    variant="outlined"
                    name="distribution_channel"
                    fullWidth
                    error={touched.distribution_channel && !!errors.distribution_channel}
                    helperText={<ErrorMessage name="distribution_channel" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Is Repeated Guest"
                    variant="outlined"
                    type="number"
                    name="is_repeated_guest"
                    fullWidth
                    error={touched.is_repeated_guest && !!errors.is_repeated_guest}
                    helperText={<ErrorMessage name="is_repeated_guest" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Previous Cancellations"
                    variant="outlined"
                    type="number"
                    name="previous_cancellations"
                    fullWidth
                    error={touched.previous_cancellations && !!errors.previous_cancellations}
                    helperText={<ErrorMessage name="previous_cancellations" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Reserved Room Type"
                    variant="outlined"
                    name="reserved_room_type"
                    fullWidth
                    error={touched.reserved_room_type && !!errors.reserved_room_type}
                    helperText={<ErrorMessage name="reserved_room_type" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Booking Changes"
                    variant="outlined"
                    type="number"
                    name="booking_changes"
                    fullWidth
                    error={touched.booking_changes && !!errors.booking_changes}
                    helperText={<ErrorMessage name="booking_changes" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Customer Type"
                    variant="outlined"
                    name="customer_type"
                    fullWidth
                    error={touched.customer_type && !!errors.customer_type}
                    helperText={<ErrorMessage name="customer_type" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Average daily rate"
                    variant="outlined"
                    type="number"
                    name="adr"
                    fullWidth
                    error={touched.adr && !!errors.adr}
                    helperText={<ErrorMessage name="adr" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Required Car Parking Spaces"
                    variant="outlined"
                    type="number"
                    name="required_car_parking_spaces"
                    fullWidth
                    error={touched.required_car_parking_spaces && !!errors.required_car_parking_spaces}
                    helperText={<ErrorMessage name="required_car_parking_spaces" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label="Total of Special Requests"
                    variant="outlined"
                    type="number"
                    name="total_of_special_requests"
                    fullWidth
                    error={touched.total_of_special_requests && !!errors.total_of_special_requests}
                    helperText={<ErrorMessage name="total_of_special_requests" />}
                    InputProps={{ sx: { px: 2, py: 1 } }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 3, mb: 2 }} />
              <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={submitting}
                  endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  Get Insights
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};

export default AddForm;
