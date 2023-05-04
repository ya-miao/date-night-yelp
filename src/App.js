import './App.css';
import axios from 'axios'

import { Box, Grid } from '@mui/material';

import CoupleYelp from './pages/CoupleYelp';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useEffect } from 'react';
Amplify.configure(awsExports);

const App = () => {

  // Example working API call. We can work off of this base.
  const config = {
    headers: {
      Authorization:
        "Bearer KNMAWkmyDKUpkTY7xuFS4bXpVgWS9uunqKuhBlfEw9mn4BOjrfNl1nDeSJphPP9LIsbGXMWCjjBX1S3EJtuhR4ackXwAB5Re_A2O0ZYP1lNFQ-SQJ5l2gjVCsTFQZHYx",
    },
    params: {
      term: "restaurants",
      location: 'NYC',
      sort_by: "best_match",
      limit: 50,
    },
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
        });
    } catch (error) {
      console.error(error);
    }
  };
  //

  useEffect(() => {
    // callYelpApi();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={{width: "100%"}}>
        <Authenticator >
          {({ signOut, user }) => (
            <Box>
              <CoupleYelp />
            </Box>
          )}
        </Authenticator>
      </Grid>
    </Grid>
  );
};

export default App;
