import { Dialog, DialogTitle, IconButton, Stack, Typography } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

const ResultsDialog = ({handleClose, open, restaurantResults}) => {
  return (
    <Dialog onClose={handleClose} open={open} fullScreen={true} sx={{ m: 10 }}>
      <DialogTitle>
        <Stack alignItems='center' direction='row' justifyContent='space-between'>
          <Typography variant='overline'>Recommended Restaurants</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon size='small' />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Stack sx={{ m: 4 }} spacing={2}>
        <Typography>Here is a list of recommended restaurants</Typography>
        {restaurantResults?.map((restaurant, index) => (
          <Typography>{restaurant?.name}</Typography>
        ))}
      </Stack>
    </Dialog>
  );
}

export default ResultsDialog;