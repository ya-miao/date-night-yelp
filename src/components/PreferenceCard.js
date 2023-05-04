import { useState } from "react";
import { Box, Card, CardContent, InputLabel, MenuItem, FormControl, Select, Slider, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, yellow } from '@mui/material/colors';

const PreferenceCard = ({ oneUser, mainColor, secColor }) => {
  const marks = [
    {
      value: 1,
      label: '$',
    },
    {
      value: 2,
      label: '$$',
    },
    {
      value: 3,
      label: '$$$',
    },
    {
      value: 4,
      label: '$$$$',
    },
  ];

  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: orange[500],
      },
    },
  });

  return (
    <Box sx={{ width: '75vh' }}>
      <Stack sx={{ mx: 2 }}>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={1}>
          <Typography fontFamily="Poppins" fontWeight="bold">{oneUser}</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke={mainColor} fill={secColor} stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="10" r="3" />
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
          </svg>
        </Stack>
        <Card style={{ backgroundColor: mainColor, color: "white" }}>
          {/* <Card> */}
          <CardContent>
            <ThemeProvider theme={theme}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography>Max distance</Typography>
                  <Box width='50vh'>
                    <Slider
                      defaultValue={10}
                      valueLabelDisplay="auto"
                      min={0}
                      max={25}
                    />
                  </Box>
                </Stack>
                <Stack spacing={1} >
                  <Typography>Cuisine Category</Typography>
                  <Box sx={{ width: '50vh' }}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={handleChange}
                        sx={{ color: orange[500] }}
                      >
                        <MenuItem value='Sushi'>Sushi</MenuItem>
                        <MenuItem value='Mexican'>Mexican</MenuItem>
                        <MenuItem value='Mediterranean'>Mediterranean</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <Typography>Price level</Typography>
                  <Box width='50vh'>
                    <Slider
                      defaultValue={1}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={marks}
                      min={1}
                      max={4}
                      sx={{ mx: 4 }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </ThemeProvider>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default PreferenceCard;