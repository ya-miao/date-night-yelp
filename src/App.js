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

  const [configParams, setConfigParams] = useState({
    term: "restaurants",
    location: 'NYC',
    sort_by: "best_match",
    limit: 10,
  });

  const [restaurantResults, setRestaurantResults] = useState([]);

  // Example working API call. We can work off of this base.
  const config = {
    headers: {
      Authorization:
        "Bearer KNMAWkmyDKUpkTY7xuFS4bXpVgWS9uunqKuhBlfEw9mn4BOjrfNl1nDeSJphPP9LIsbGXMWCjjBX1S3EJtuhR4ackXwAB5Re_A2O0ZYP1lNFQ-SQJ5l2gjVCsTFQZHYx",
    },
    params: configParams,
  };
  //
  const callYelpApi = async () => {
    console.log('callYelpApi:');
    try {
      await axios
        .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, config)
        .then((response) => {
          console.log('response: ');
          console.log(response);
          setRestaurantResults(response?.data?.businesses);
        });
    } catch (error) {
      console.error(error);
    }
  };
  //

  useEffect(() => {
    console.log('restaurantResults: ');
    console.log(restaurantResults);
  }, [restaurantResults])

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
              <CoupleYelp callYelpApi={callYelpApi} setConfigParams={setConfigParams} restaurantResults={restaurantResults} />
            </Box>
          )}
        </Authenticator>
      </Grid>
    </Grid>
  );
};

export default App;
