import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import DiningSvg from "../images/dining.svg";
import PreferenceCard from "../components/PreferenceCard";
import { orange, yellow } from '@mui/material/colors';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ResultsDialog from '../components/ResultsDialog';

// Let's add some way for users to input person 1 and person 2
// We also need to take into account preferences from both person 1 and 2 separately
const CoupleYelp = ({ callYelpApi, restaurantResults, setCategory, setMaxDistanceOne, setPriceLevelOne, setMaxDistanceTwo, setPriceLevelTwo, location }) => {
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
    <Stack mb={4}>
      <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: "#28282B", padding: "0.5rem 2rem"}}>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={0.5}>
          <Typography style={{color: "white", fontWeight: "bold"}}>Current Location: <span style={{color: "orange"}}>{location.principalSubdivision}</span></Typography>
          <PinDropIcon size='small' style={{color: "orange"}}/>
        </Stack>
        <button onClick={signOut} className='signout-btn'
        >Sign Out</button>
      </Stack>
      <Stack alignItems='center' justifyContent='center' mt={2}>
        <img src={DiningSvg} alt="Your SVG" className='dining-image' />
        <Stack direction="column" mt={2} className='white-container' padding={4} bgcolor="white" alignItems="center" alignContent="center">
            <Typography variant="h3" fontFamily="Pacifico" className="underlined">Not sure where to eat?</Typography>
          <Box direction="row" mt={5}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <PreferenceCard oneUser='Person One' mainColor="#A64AC9" secColor="#eecdfb"
                  setCategory={setCategory}
                  setMaxDistance={setMaxDistanceOne}
                  setPriceLevel={setPriceLevelOne} />
              </Grid>
              <Divider></Divider>
              <Grid item xs={6}>
                <PreferenceCard oneUser='Person Two' mainColor="#473890" secColor="#d7cffc"
                  setCategory={setCategory}
                  setMaxDistance={setMaxDistanceTwo}
                  setPriceLevel={setPriceLevelTwo} />
              </Grid>
            </Grid>
          </Box>
        </Stack><button
          className='find-resturants-button'
          onClick={() => {
            setOpenResults(true);
            // API call runs here
            callYelpApi();
          }}
        >
          Find restaurants</button>
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