import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import DiningSvg from "../images/dining.svg";
import PreferenceCard from "../components/PreferenceCard";
import { orange, yellow } from '@mui/material/colors';

import ResultsDialog from '../components/ResultsDialog';

// Let's add some way for users to input person 1 and person 2
// We also need to take into account preferences from both person 1 and 2 separately
const CoupleYelp = ({ callYelpApi, restaurantResults, setMaxDistance, setCategory, setPriceLevel }) => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const [openResults, setOpenResults] = useState(false);

  const handleCloseResults = () => {
    setOpenResults(false);
  };

  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: "black", color: orange[500] }}>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={1}>
          <Typography>Current Location: NYC</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke={orange[500]} fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="11" r="3" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
        </Stack>
        <Button onClick={signOut}
          sx={{
            textDecoration: "none",
            backgroundColor: "white",
          }}
        >Sign Out</Button>
      </Stack>
      <Stack alignItems='center' justifyContent='center' className='title-section'>
        <img src={DiningSvg} alt="Your SVG" />
        <Stack direction="column" sx={{ width: "fitContent", height: "95%", borderRadius: "5px" }} padding={4} bgcolor="white" alignItems="center" alignContent="center">
          <Typography variant="h3" fontFamily="Pacifico">Not sure where to eat?</Typography>
          <Button variant='contained' onClick={() => {
            setOpenResults(true);
            // API call runs here
            callYelpApi();
          }} sx={{ mb: 6 }}>Find restaurants</Button>
          <Box direction="row" mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <PreferenceCard oneUser='Person One' mainColor="#A64AC9" secColor="#eecdfb"
                  setMaxDistance={setMaxDistance}
                  setCategory={setCategory}
                  setPriceLevel={setPriceLevel} />
              </Grid>
              <Grid item xs={6}>
                <PreferenceCard oneUser='Person Two' mainColor="#473890" secColor="#d7cffc"
                  setMaxDistance={setMaxDistance}
                  setCategory={setCategory}
                  setPriceLevel={setPriceLevel} />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>
      <ResultsDialog
        open={openResults}
        handleClose={handleCloseResults}
        restaurantResults={restaurantResults}
      />
    </Stack>
  )
};

export default CoupleYelp;