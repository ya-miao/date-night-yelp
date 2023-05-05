import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { Box, Button, Divider, Grid, Stack, Typography, TextField } from "@mui/material";
import DiningSvg from "../images/dining.svg";
import PreferenceCard from "../components/PreferenceCard";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ResultsDialog from '../components/ResultsDialog';

const CoupleYelp = ({ callYelpApi, restaurantResults, setCategories, setMaxDistanceOne, setPriceLevelOne, setMaxDistanceTwo, setPriceLevelTwo, location }) => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const [openResults, setOpenResults] = useState(false);
  const [user1Name, setUser1Name] = useState("");
  const [user2Name, setUser2Name] = useState("");
  const [open, setOpen] = useState(true);

  const handleCloseResults = () => {
    setOpenResults(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack mb={4}>
      <Dialog
        fullWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Please input your names</DialogTitle>
        <DialogContent>
          <Stack spacing={10} direction="row">
            <TextField id="standard-basic" label="Person 1" variant="standard" onChange={e => setUser1Name(e.target.value)}/>
            <TextField id="standard-basic" label="Person 2" variant="standard" onChange={e => setUser2Name(e.target.value)}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Stack direction='row' justifyContent='space-between' sx={{ backgroundColor: "#28282B", padding: "0.5rem 2rem" }}>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={0.5}>
          <Typography style={{ color: "white", fontWeight: "bold" }}>Current Location: <span style={{ color: "orange" }}>{location.locality + `, ` + location.principalSubdivision}</span></Typography>
          <PinDropIcon size='small' style={{ color: "orange" }} />
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
                <PreferenceCard oneUser={user1Name} mainColor="#A64AC9" secColor="#eecdfb"
                  setCategories={setCategories}
                  setMaxDistance={setMaxDistanceOne}
                  setPriceLevel={setPriceLevelOne} />
              </Grid>
              <Divider></Divider>
              <Grid item xs={6}>
                <PreferenceCard oneUser={user2Name} mainColor="#473890" secColor="#d7cffc"
                  setCategories={setCategories}
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
        location={location}
      />
    </Stack>
  )
};

export default CoupleYelp;