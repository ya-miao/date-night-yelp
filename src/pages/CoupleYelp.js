import { Auth } from 'aws-amplify';
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import PreferenceCard from "../components/PreferenceCard";

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
      <Stack direction='row' justifyContent='space-between' sx={{ m: 4 }}>
        <Typography>Current Location: NYC</Typography>
        <Button onClick={signOut}>Sign Out</Button>
      </Stack>
      <Stack spacing={4} alignItems='center' justifyContent='center'>
        <Typography variant="h3">What do you want to eat?</Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <PreferenceCard oneUser='Person One' />
          </Grid>
          <Grid item xs={6}>
            <PreferenceCard oneUser='Person Two' />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
};

export default CoupleYelp;