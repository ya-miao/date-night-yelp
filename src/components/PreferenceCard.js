import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Checkbox, FormControlLabel, FormGroup, FormControl, Slider, Stack, Typography } from "@mui/material";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const PreferenceCard = ({ oneUser, mainColor, secColor, setMaxDistance, setCategories, setPriceLevel }) => {
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

  const [features, setFeatures] = useState([
    {
      name: "Rating",
      isDragging: false
    },
    {
      name: "Distance",
      isDragging: false
    },
    {
      name: "Cost",
      isDragging: false
    }
  ]);

  const [checkCategories, setCheckCategories] = useState({
    breakfast_brunch: false,
    burgers: false,
    chinese: false,
    french: false,
    greek: false,
    hotpot: false,
    italian: false,
    japanese: false,
    korean: false,
    mediterranean: false,
    mexican: false,
    pizza: false,
    thai: false,
    vegan: false,
    vegetarian: false,
    vietnamese: false,
  });

  const {
    breakfast_brunch,
    burgers,
    chinese,
    french,
    greek,
    hotpot,
    italian,
    japanese,
    korean,
    mediterranean,
    mexican,
    pizza,
    thai,
    vegan,
    vegetarian,
    vietnamese
  } = checkCategories;

  const handleCheckChange = (event) => {
    setCheckCategories({
      ...checkCategories,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDistanceChange = (event) => {
    setMaxDistance(event.target.value);
  };

  const handlePriceLevelChange = (event) => {
    setPriceLevel(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const getCheckedCategories = Object.keys(checkCategories).filter(key => checkCategories[key] === true);
    setCategories(getCheckedCategories);
  };

  useEffect(() => {
    handleCategoryChange();
  }, [checkCategories])

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
    <Stack sx={{ mx: 2 }} spacing={1.5}>
      <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke={mainColor} fill={secColor} stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="10" r="3" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
        <Typography fontWeight="bold" variant="h6">{oneUser}</Typography>
      </Stack>
      <Card style={{ backgroundColor: mainColor, color: "white" }}>
        <CardContent>
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <div className="feature-text" style={{ backgroundColor: secColor, color: "black" }}>
                <Stack spacing={1}>
                  <Typography>Max Price Level</Typography>
                  <Box display='flex' sx={{ m: 1 }}>
                    <Slider
                      defaultValue={2}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={marks}
                      min={1}
                      max={4}
                      sx={{ mx: 4 }}
                      onChange={handlePriceLevelChange}
                    />
                  </Box>
                </Stack>
              </div>
              <div className="feature-text" style={{ backgroundColor: secColor, color: "black" }}>
                <Stack spacing={1}>
                  <Typography>Max Distance Away (Miles)</Typography>
                  <Box display='flex' sx={{ m: 1 }}>
                    <Slider
                      defaultValue={15}
                      valueLabelDisplay="auto"
                      min={0}
                      max={25}
                      onChange={handleDistanceChange}
                    />
                  </Box>
                </Stack>
              </div>
              <div className="feature-text" style={{ backgroundColor: secColor, color: "black" }}>
                <Stack spacing={1}>
                  <Typography>Categories</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={breakfast_brunch} onChange={handleCheckChange} name="breakfast_brunch" />
                          }
                          label="Breakfast, Brunch"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={burgers} onChange={handleCheckChange} name="burgers" />
                          }
                          label="Burgers"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={chinese} onChange={handleCheckChange} name="chinese" />
                          }
                          label="Chinese"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={french} onChange={handleCheckChange} name="french" />
                          }
                          label="French"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={greek} onChange={handleCheckChange} name="greek" />
                          }
                          label="Greek"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={hotpot} onChange={handleCheckChange} name="hotpot" />
                          }
                          label="Hotpot"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={italian} onChange={handleCheckChange} name="italian" />
                          }
                          label="Italian"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={japanese} onChange={handleCheckChange} name="japanese" />
                          }
                          label="Japanese"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      sx={{ m: 3 }}
                      variant="standard"
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={korean} onChange={handleCheckChange} name="korean" />
                          }
                          label="Korean"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={mediterranean} onChange={handleCheckChange} name="mediterranean" />
                          }
                          label="Mediterranean"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={mexican} onChange={handleCheckChange} name="mexican" />
                          }
                          label="Mexican"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={pizza} onChange={handleCheckChange} name="pizza" />
                          }
                          label="Pizza"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={thai} onChange={handleCheckChange} name="thai" />
                          }
                          label="Thai"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={vegan} onChange={handleCheckChange} name="vegan" />
                          }
                          label="Vegan"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={vegetarian} onChange={handleCheckChange} name="vegetarian" />
                          }
                          label="Vegetarian"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={vietnamese} onChange={handleCheckChange} name="vietnamese" />
                          }
                          label="Vietnamese"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </Stack>
              </div>
            </Stack>
          </ThemeProvider>
        </CardContent>
      </Card>
    </Stack>
  );
}


export default PreferenceCard;