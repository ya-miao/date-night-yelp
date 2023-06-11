import './App.css';
import axios from 'axios'

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CoupleYelp from './pages/CoupleYelp';

import yelpApi from './yelp-api.json';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

const App = () => {

  const [userLocation, setUserLocation] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [maxDistanceOne, setMaxDistanceOne] = useState(15);
  const [priceLevelOne, setPriceLevelOne] = useState(2);

  const [maxDistanceTwo, setMaxDistanceTwo] = useState(15);
  const [priceLevelTwo, setPriceLevelTwo] = useState(2);

  const [categoriesOne, setCategoriesOne] = useState([]);
  const [categoriesTwo, setCategoriesTwo] = useState([]);

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const configParams = {
    term: "restaurants",
    latitude: userLocation?.latitude,
    longitude: userLocation?.longitude,
    sort_by: "best_match",
    limit: 25,
    categories: categoriesOne.concat(categoriesTwo).filter((element, index, array) => array.indexOf(element) === index).toString(),
    radius: (maxDistanceOne > maxDistanceTwo ? maxDistanceOne : maxDistanceTwo) * 1609,
    price: priceLevelOne !== priceLevelTwo ? `${priceLevelOne}, ${priceLevelTwo}` : priceLevelOne
  };

  const [restaurantResults, setRestaurantResults] = useState([]);

  const config = {
    headers: {
      Authorization:
        `Bearer ${yelpApi?.apiKey}`,
    },
    params: configParams,
  };

  const callYelpApi = async () => {
    if (userLocation.length === 0) {
      setOpenSnackbar(true);
    } else {
      setOpenBackdrop(true);
      try {
        await axios
          .get(`${yelpApi?.corsServer}https://api.yelp.com/v3/businesses/search`, config)
          .then((response) => {
            setRestaurantResults(response?.data?.businesses);
          });
      } catch (error) {
        console.error(error);
      }
      setOpenBackdrop(false);
    }
  };

  const getUserLocation = async () => {
    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const jsonData = await response.json();
      setUserLocation(jsonData);
    }

    const error = () => {
      console.log("Mission Failed")
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    getUserLocation();
  }, [])

  const components = {
    Header() {
      return (
        <Typography variant="h3" fontFamily="Pacifico" className="underlined" sx={{ mb: 5 }}>Not sure where to eat?</Typography>
      );
    },
  }

  const siteTheme = createTheme({
    palette: {
      primary: {
        main: '#9a3a3a',
      },
      secondary: {
        main: '#ffb030',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
  },
  );

  return (
    <ThemeProvider theme={siteTheme}>
      <Box sx={{ mb: 4 }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Authenticator components={components}>
              {({ signOut, user }) => (
                <Box>
                  <CoupleYelp
                    callYelpApi={callYelpApi}
                    restaurantResults={restaurantResults}
                    setCategoriesOne={setCategoriesOne}
                    setCategoriesTwo={setCategoriesTwo}
                    setMaxDistanceOne={setMaxDistanceOne}
                    setPriceLevelOne={setPriceLevelOne}
                    setMaxDistanceTwo={setMaxDistanceTwo}
                    setPriceLevelTwo={setPriceLevelTwo}
                    location={userLocation}
                    getUserLocation={getUserLocation}
                    userLocation={userLocation}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                  <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }} open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                      Allow access to your location to get recommendations.
                    </Alert>
                  </Snackbar>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: 2000 }}
                    open={openBackdrop}
                  >
                    <CircularProgress color="inherit" sx={{ zIndex: 2001 }} />
                  </Backdrop>
                </Box>
              )}
            </Authenticator>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
