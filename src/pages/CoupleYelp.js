import { Auth } from 'aws-amplify';
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import DiningSvg from "../images/dining.svg";
import PreferenceCard from "../components/PreferenceCard";
import { orange } from '@mui/material/colors';

// Let's add some way for users to input person 1 and person 2
const CoupleYelp = () => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: "black", color: orange[500] }}>
        <Typography>Current Location: NYC</Typography>
        <Button onClick={signOut}>Sign Out</Button>
      </Stack>
      <Stack alignItems='center' justifyContent='center'>
        <Stack className='title-section' alignItems='center' justifyContent='center'>
            <Typography variant="h3">Not sure where to eat?</Typography>
          <img src={DiningSvg} alt="Your SVG" />
        </Stack>
        <Grid container spacing={4} bgcolor="#E5E9E7" borderRadius="5px">
          <Grid item xs={6}>
            <PreferenceCard oneUser='Person One' color="#A64AC9" />
          </Grid>
          <Grid item xs={6}>
            <PreferenceCard oneUser='Person Two' color="#473890" />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
};

export default CoupleYelp;