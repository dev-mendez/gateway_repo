import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import Router from 'next/router';
import * as yup from 'yup';
import React from 'react';
import axios from 'axios';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useSnackbar } from 'notistack';

import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fcfcfc',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  uid: yup.string().required('Required'),
  vendor: yup.string().required('Required'),
  status: yup.boolean(),
});

const AddDeviceForm = ({ callBack_AddDevice }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      uid: '',
      vendor: '',
      status: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.idGateway = Router.query.id;

      try {
        const response = await axios({
          url: 'http://localhost:3000/device',
          method: 'POST',
          data: values,
        });
        callBack_AddDevice(response.data);
        handleClose();
        formik.resetForm();
        enqueueSnackbar('Device Mounted!', { variant: 'info' });
      } catch (error) {
        const message = Object.values(
          error.response.data.message[0].constraints
        );
        enqueueSnackbar(`${message}`, {
          variant: 'error',
        });
      }
    },
  });
  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="outlined"
        startIcon={<AddIcon />}
      >
        {' '}
        Add Device
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mb: 2, color: '#6F6E6E' }}
            >
              Add Device
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="uid"
                name="uid"
                type="string"
                label="Enter a UID"
                value={formik.values.uid}
                onChange={formik.handleChange}
                error={formik.touched.uid && Boolean(formik.errors.uid)}
                helperText={formik.touched.uid && formik.errors.uid}
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="vendor"
                name="vendor"
                label="Enter vendor name"
                type="text"
                value={formik.values.vendor}
                onChange={formik.handleChange}
                error={formik.touched.vendor && Boolean(formik.errors.vendor)}
                helperText={formik.touched.vendor && formik.errors.vendor}
              />{' '}
              <Stack
                direction="row"
                justifyItems="center"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                marginTop="2rem"
                marginBottom="2rem"
              >
                <Typography sx={{ color: 'gray' }}>Stopped</Typography>
                <Switch
                  id="status"
                  name="status"
                  label="Enter status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  size="large"
                />
                <Typography sx={{ color: 'gray' }}>Running</Typography>
              </Stack>
              <hr />
              <Box sx={{ my: 2 }}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddDeviceForm;
