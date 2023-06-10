import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography, TextField } from "@mui/material";
import DiningSvg from "../images/dining.svg";
import PreferenceCard from "../components/PreferenceCard";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ResultsDialog from '../components/ResultsDialog';

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
    <Stack mb={4}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography fontFamily="Poppins" sx={{ mt: 1 }}>Who can't decide what to eat?</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={6} direction="row">
            {/* <TextField size='small' fontFamily='Poppins' label="Person 1" variant="standard" onChange={e => setUser1Name(e.target.value)} />
            <TextField size='small' fontFamily='Poppins' label="Person 2" variant="standard" onChange={e => setUser2Name(e.target.value)} /> */}
            <TextField size='small' label="Person 1" variant="standard" onChange={e => setUser1Name(e.target.value)} />
            <TextField size='small' label="Person 2" variant="standard" onChange={e => setUser2Name(e.target.value)} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Set</Button>
        </DialogActions>
      </Dialog>
      <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: "#28282B", padding: "0.5rem 2rem" }}>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={0.5}>
          <PinDropIcon size='small' style={{ color: "orange" }} />
          {/* <Typography style={{ color: "white", fontWeight: "bold" }}>Current Location: <span style={{ color: "orange" }}>{location.locality + `, ` + location.principalSubdivision}</span></Typography> */}
          <Typography style={{ color: "white", fontWeight: "bold" }}><span style={{ color: "orange" }}>{location.locality + `, ` + location.principalSubdivision}</span></Typography>
        </Stack>
        <button onClick={signOut} className='signout-btn'
        >Sign Out</button>
      </Stack>
      <Stack alignItems='center' justifyContent='center' mt={2}>
        <img src={DiningSvg} alt="Your SVG" className='dining-image' />
        {/* <Stack direction="column" mt={2} className='white-container' padding={4} bgcolor="white" alignItems="center" alignContent="center"> */}
        <Stack direction="column" sx={{ m: 4 }} alignItems="center" justifyContent="center" spacing={1}>
          <Stack spacing={3} alignItems="center" alignContent="center">
            <Typography variant="h3" fontFamily="Pacifico" className="underlined">Not sure where to eat?</Typography>
            <Button onClick={() => setOpen(true)} variant='contained' sx={{ textTransform: 'none' }}>
              <Typography>Enter Names</Typography>
            </Button>
          </Stack>
          {/* <Box direction="row" mt={1}> */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {/* <PreferenceCard oneUser={user1Name} mainColor="#A64AC9" secColor="#eecdfb" */}
                  <PreferenceCard oneUser={user1Name} mainColor="#964b4b" secColor="#eecdfb"
                    setCategories={setCategoriesOne}
                    setMaxDistance={setMaxDistanceOne}
                    setPriceLevel={setPriceLevelOne} />
                </Grid>
                <Divider></Divider>
                <Grid item xs={12} md={6}>
                  <PreferenceCard oneUser={user2Name} mainColor="#4E6D3F" secColor="#d7cffc"
                    setCategories={setCategoriesTwo}
                    setMaxDistance={setMaxDistanceTwo}
                    setPriceLevel={setPriceLevelTwo} />
                </Grid>
              </Grid>
        </Stack><button
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
          Find restaurants</button>
      </Stack>
      <ResultsDialog
        open={openResults}
        handleClose={handleCloseResults}
        restaurantResults={restaurantResults}
        location={location}
      />
    </Stack>
  )
};

export default CoupleYelp;