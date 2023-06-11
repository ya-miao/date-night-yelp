import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { Box, Button, Divider, Fab, Grid, Stack, Typography, TextField } from "@mui/material";
import DiningSvg from "../images/dining.svg";
import PreferenceCard from "../components/PreferenceCard";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ResultsDialog from '../components/ResultsDialog';

import LogoutIcon from '@mui/icons-material/Logout';

const CoupleYelp = ({ callYelpApi, restaurantResults, setCategoriesOne, setCategoriesTwo, setMaxDistanceOne, setPriceLevelOne, setMaxDistanceTwo, setPriceLevelTwo, location, getUserLocation, userLocation, setOpenSnackbar }) => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const [openResults, setOpenResults] = useState(false);
  const [user1Name, setUser1Name] = useState("Person 1");
  const [user2Name, setUser2Name] = useState("Person 2");
  const [open, setOpen] = useState(false);

  const handleCloseResults = () => {
    setOpenResults(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography fontFamily="Poppins" sx={{ mt: 1 }}>Who can't decide what to eat?</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={6} direction="row">
            <TextField size='small' label="Person 1" variant="standard" onChange={e => setUser1Name(e.target.value)} />
            <TextField size='small' label="Person 2" variant="standard" onChange={e => setUser2Name(e.target.value)} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Set</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ backgroundColor: "#28282B" }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' justifyContent='center' gap={0.5}>
            <PinDropIcon size='small' style={{ color: "orange" }} />
            <Typography style={{ color: "white", fontWeight: "bold" }}><span style={{ color: "orange" }}>{location.locality + `, ` + location.principalSubdivision}</span></Typography>
          </Stack>
          <Fab size='small' onClick={signOut} sx={{ m: 1 }}>
            <LogoutIcon fontSize='small' />
          </Fab>
        </Stack>
      </Box>
      <Stack alignItems='center' justifyContent='center' spacing={4}>
        <Stack alignItems='center' justifyContent='center'>
          <img src={DiningSvg} alt="Your SVG" className='dining-image' />
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={3}>
            <Stack spacing={4} alignItems="center" alignContent="center">
              <Grid container>
                <Grid item display={{ xs: 'none', sm: 'block' }}>
                  <Typography variant="h3" fontFamily="Pacifico" className="underlined">Not sure where to eat?</Typography>
                </Grid>
                <Grid item display={{ xs: 'block', sm: 'none' }}>
                  <Typography variant="h4" fontFamily="Pacifico" className="underlined">Not sure where to eat?</Typography>
                </Grid>
              </Grid>
              <button className='find-resturants-button' onClick={() => setOpen(true)}>
                <Typography>Enter Names</Typography>
              </button>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <PreferenceCard oneUser={user1Name} mainColor="#964b4b" secColor="#eecdfb"
                  setCategories={setCategoriesOne}
                  setMaxDistance={setMaxDistanceOne}
                  setPriceLevel={setPriceLevelOne} />
              </Grid>
              <Grid item display={{ xs: 'block', md: 'none' }}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={6}>
                <PreferenceCard oneUser={user2Name} mainColor="#4E6D3F" secColor="#d7cffc"
                  setCategories={setCategoriesTwo}
                  setMaxDistance={setMaxDistanceTwo}
                  setPriceLevel={setPriceLevelTwo} />
              </Grid>
            </Grid>
          </Stack>
          <button
            className='find-resturants-button'
            onClick={() => {
              if (userLocation.length === 0) {
                setOpenSnackbar(true);
              } else {
                setOpenResults(true);
                callYelpApi();
              }
            }}
          >
            Find Restaurants
          </button>
        </Stack>
      </Stack>
      <ResultsDialog
        open={openResults}
        handleClose={handleCloseResults}
        restaurantResults={restaurantResults}
        location={location}
      />
    </Box>
  )
};

export default CoupleYelp;