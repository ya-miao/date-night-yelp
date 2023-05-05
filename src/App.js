import './App.css';
import axios from 'axios'

import { Box, Grid } from '@mui/material';

import CoupleYelp from './pages/CoupleYelp';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

const App = () => {

  const [userLocation, setUserLocation] = useState([]);

  const [maxDistanceOne, setMaxDistanceOne] = useState(15);
  const [priceLevelOne, setPriceLevelOne] = useState(2);

  const [maxDistanceTwo, setMaxDistanceTwo] = useState(15);
  const [priceLevelTwo, setPriceLevelTwo] = useState(2);

  const [categoriesOne, setCategoriesOne] = useState([]);
  const [categoriesTwo, setCategoriesTwo] = useState([]);

  const configParams = {
    term: "restaurants",
    latitude: userLocation?.latitude,    
    longitude: userLocation?.longitude,    
    sort_by: "best_match",
    limit: 20,
    categories: categoriesOne.concat(categoriesTwo).filter((element, index, array) => array.indexOf(element) === index).toString(),
    radius: (maxDistanceOne > maxDistanceTwo ? maxDistanceOne : maxDistanceTwo) * 1609,
    price: priceLevelOne !== priceLevelTwo ? `${priceLevelOne}, ${priceLevelTwo}` : priceLevelOne
  };

  const [restaurantResults, setRestaurantResults] = useState([]);

  const config = {
    headers: {
      Authorization:
        "Bearer KNMAWkmyDKUpkTY7xuFS4bXpVgWS9uunqKuhBlfEw9mn4BOjrfNl1nDeSJphPP9LIsbGXMWCjjBX1S3EJtuhR4ackXwAB5Re_A2O0ZYP1lNFQ-SQJ5l2gjVCsTFQZHYx",
    },
    params: configParams,
  };

  const callYelpApi = async () => {
    console.log('callYelpApi:');
    try {
      await axios
        .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, config)
        .then((response) => {
          console.log('response: ');
          console.log(response);
          setRestaurantResults(response?.data?.businesses);
          console.log(response?.data?.businesses[0])
        });
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    console.log('restaurantResults: ');
    console.log(restaurantResults);
    console.log(userLocation, "userLocation");
  }, [restaurantResults, userLocation])

  useEffect(() => {
    getUserLocation();
  }, [])

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={{ width: "100%" }}>
        <Authenticator >
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
              />
            </Box>
          )}
        </Authenticator>
      </Grid>
    </Grid>
  );
};

export default App;
