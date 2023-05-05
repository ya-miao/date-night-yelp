import { Button, Dialog, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function getDistance(user_loc, restaurant_loc) {
  const R = 6373;
  const lat1 = user_loc.latitude;
  const lon1 = user_loc.longitude;
  const lat2 = restaurant_loc.latitude;
  const lon2 = restaurant_loc.longitude;
  const dLat = deg2rad(lat1 - lat2);
  const dLon = deg2rad(lon1 - lon2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d.toFixed(2);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function func1(restaurant) {
  console.log("restaurant: " + JSON.stringify(restaurant));
}


const ResultsDialog = ({ handleClose, open, restaurantResults, location }) => {
  return (
    <Dialog onClose={handleClose} open={open} fullScreen={true} sx={{ m: 5 }}>
      <DialogTitle style={{backgroundColor: "#C1C8E4", padding: "0"}}>
        <Stack alignItems='center' direction='row' justifyContent='space-between'>
          <Typography variant='overline'></Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon size='small' color="black"/>
          </IconButton>
        </Stack>
      </DialogTitle>
      <Box>
        <Stack justifyContent="center" alignItems="center" style={{backgroundColor: "#C1C8E4"}}>
          <Stack>
            <Typography variant="h3" fontFamily="Pacifico" className="underlined">Winner!</Typography>
          </Stack>
          <Card sx={{ width: 345, margin: "30px 0" }}>
            <CardHeader
              title="Winner Name"
              style={{ backgroundColor: "#28282B", color: "orange", borderBottom: "2px solid orange" }}
            />
            <CardMedia
              component="img"
              height="194"
              alt="Paella dish"
            />
            <CardContent>
              <Stack spacing={1}>
                {/* <Typography>{restaurant?.location.display_address[0] + " | " + restaurant?.location.display_address[1]}</Typography>
              <Stack direction="row">
                <Typography><span style={{ fontWeight: "bold" }}>Rating:</span> {restaurant?.rating}</Typography>
                <GradeIcon size='small' style={{ color: "orange", marginLeft: "2px" }} />
              </Stack>
              <Typography><span style={{ fontWeight: "bold" }}>Phone:</span> {restaurant?.display_phone}</Typography>
              <Typography><span style={{ fontWeight: "bold" }}>Price:</span> {restaurant?.price}</Typography>
              <Typography><span style={{ fontWeight: "bold" }}>Diatance:</span> {getDistance(location, restaurant.coordinates)} <span> miles</span></Typography> */}
              </Stack>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteBorderIcon style={{ color: "orange" }} />
              </IconButton>
              {/* <a href={restaurant?.url} title={restaurant?.name + ` Yelp Page`} target="_blank"> */}
              <Button style={{ color: "orange", fontWeight: "bold", marginLeft: "2px" }}>Visit Site</Button>
              {/* </a> */}
            </CardActions>
          </Card>
        </Stack>
        <Box sx={{ flexGrow: 1 }} ml={5} mt={5}>
          <Stack justifyContent="center" alignItems="center" mb={5}>
          <Typography variant="h4" fontFamily="Poppins" letterSpacing={0}>You may also like</Typography>
          </Stack>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {restaurantResults?.map((restaurant, index) => (
              <Grid item md={4} key={index} justifyContent="center" alignItems="center">
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={restaurant?.name}
                    style={{ backgroundColor: "#28282B", color: "orange", borderBottom: "2px solid orange" }}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={restaurant?.image_url}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography>{restaurant?.location.display_address[0] + " | " + restaurant?.location.display_address[1]}</Typography>
                      <Stack direction="row">
                        <Typography><span style={{ fontWeight: "bold" }}>Rating:</span> {restaurant?.rating}</Typography>
                        <GradeIcon size='small' style={{ color: "orange", marginLeft: "2px" }} />
                      </Stack>
                      <Typography><span style={{ fontWeight: "bold" }}>Phone:</span> {restaurant?.display_phone}</Typography>
                      <Typography><span style={{ fontWeight: "bold" }}>Price:</span> {restaurant?.price}</Typography>
                      <Typography><span style={{ fontWeight: "bold" }}>Diatance:</span> {getDistance(location, restaurant.coordinates)} <span> miles</span></Typography>
                    </Stack>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteBorderIcon style={{ color: "orange" }} />
                    </IconButton>
                    <a href={restaurant?.url} title={restaurant?.name + ` Yelp Page`} target="_blank">
                      <Button style={{ color: "orange", fontWeight: "bold", marginLeft: "2px" }}>Visit Site</Button>
                    </a>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ResultsDialog;