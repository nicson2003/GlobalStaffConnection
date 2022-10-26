import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import InputField from './InputField';
import Alert from '../Alert';

import {costLogic, volume} from '../../constant';

const bgImage = require('../../assets/parcelBoxes.jpeg');

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  margin: theme.spacing(2),
  lineHeight: '60px',
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Parcels
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const defaultAlert = {
  message: '',
  severity: 'success',
};


export default function ParcelCostCalculator() {

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(defaultAlert);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(0)
  }, [weight, height, width, depth]);

  const computeCost = () => {
    if (
      [weight, height, width, depth].every(
        (value) => value === 0 || value === '0' || value === ''
      )
    ) {
      setCost(0);
      setAlertMessage({
        message: `${costLogic.reject.rule} - Unable to compute cost`,
        severity: 'error',
      });
    } else if (weight > costLogic.reject.weightLimit) {
      setCost(0);
      setAlertMessage({
        message: costLogic.reject.rule,
        severity: 'error',
      });
    } else if (weight > costLogic.heavyParcel.weightLimit) {
      setCost(weight * costLogic.heavyParcel.basePrice);
      setAlertMessage({
        message: costLogic.heavyParcel.rule,
        severity: 'warning',
      });
    } else {
      const parcelVolume = volume(height, width, depth);

      if (parcelVolume < costLogic.smallParcel.volumeLimit) {
        setCost(parcelVolume * costLogic.smallParcel.basePrice);
        setAlertMessage({
          message: `${costLogic.smallParcel.rule}`,
          severity: 'success',
        });
      } else if (parcelVolume < costLogic.mediumParcel.volumeLimit) {
        setCost(parcelVolume * costLogic.mediumParcel.basePrice);
        setAlertMessage({
          message: `${costLogic.mediumParcel.rule}`,
          severity: 'success',
        });
      } else {
        setCost(parcelVolume * costLogic.largeParcel.basePrice);
        setAlertMessage({
          message: `${costLogic.largeParcel.rule}`,
          severity: 'success',
        });
      }
    }
   setShowAlert(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    computeCost();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Alert
          open={showAlert}
          setOpen={setShowAlert}
          message={alertMessage.message}
          severity={alertMessage.severity}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LocalShippingIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Parcel
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <InputField
                id="weight"
                name="weight"
                inputLabel="Weight"
                unit="kg"
                value={weight}
                setValue={setWeight}
              />
              <InputField
                id="height"
                name="height"
                inputLabel="Height"
                unit="cm"
                value={height}
                setValue={setHeight}
              />
              <InputField
                id="width"
                name="width"
                inputLabel="Width"
                unit="cm"
                value={width}
                setValue={setWidth}
              />
              <InputField
                id="depth"
                name="depth"
                inputLabel="Depth"
                unit="cm"
                value={depth}
                setValue={setDepth}
              />
              <Item elevation={8}>{`Delivery Cost: $${cost}`}</Item>

              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Compute
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
