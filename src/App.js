import './App.css';

import axios from 'axios'

import { Container } from '@mui/material';

import CoupleYelp from './pages/CoupleYelp';

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
  axios
    .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, config)
    .then((response) => {
      console.log('response: ');
      console.log(response);
    });
  //

  return (
    <Container sx={{ my: 4 }}>
      <CoupleYelp />
    </Container>
  );
};

export default App;
