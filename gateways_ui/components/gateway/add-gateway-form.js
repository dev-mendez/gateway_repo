import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import { useSnackbar } from 'notistack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(234, 243, 253)',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  serialNumber: yup.string().required('Required'),
  name: yup.string().required('Required'),
});

const validate = (values) => {
  const errors = {};

  if (!values.ipV4) {
    errors.ipV4 = 'Required';
  } else if (
    !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      values.ipV4
    )
  ) {
    errors.ipV4 = 'Invalid ipV4 address';
  }

  return errors;
};

const AddGatewayForm = ({ callBackGateway }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      serialNumber: '',
      name: '',
      ipV4: '',
    },
    validationSchema: validationSchema,
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          url: 'http://localhost:3000/gateway/create',
          method: 'POST',
          data: values,
        });
        callBackGateway(response.data);
        handleClose();
        enqueueSnackbar('Gateway Mounted!', {
          variant: 'info',
        });
        formik.resetForm();
        console.log(response.data.message);
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
        data-testid="button-create-gateway"
        onClick={handleOpen}
        color="primary"
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Add Gateway
      </Button>
      <Modal
        data-testid="modal-create-gateway"
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
              sx={{ mb: 2, color: 'gray' }}
            >
              Add Gateway
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="serialNumber"
                name="serialNumber"
                label="Enter serial number"
                value={formik.values.serialNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.serialNumber &&
                  Boolean(formik.errors.serialNumber)
                }
                helperText={
                  formik.touched.serialNumber && formik.errors.serialNumber
                }
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="name"
                name="name"
                label="Enter gateway name"
                type="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                sx={{ my: 2 }}
                fullWidth
                id="ipV4"
                name="ipV4"
                label="Enter a valid IPv4 address"
                type="ipV4"
                value={formik.values.ipV4}
                onChange={formik.handleChange}
                error={formik.touched.ipV4 && Boolean(formik.errors.ipV4)}
                helperText={formik.touched.ipV4 && formik.errors.ipV4}
              />
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

export default AddGatewayForm;
