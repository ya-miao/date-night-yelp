import React, { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, InputLabel, MenuItem, FormControl, Select, Slider, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const PreferenceCard = ({ oneUser, mainColor, secColor, setMaxDistance, setCategory, setPriceLevel }) => {
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

  // const [category, setCategory] = useState('');
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

  const handleDistanceChange = (event) => {
    setMaxDistance(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceLevelChange = (event) => {
    setPriceLevel(event.target.value);
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

  let featureItemDrag = useRef()
  let featureItemDragOver = useRef()

  function D_Start(e, index) {
    featureItemDrag.current = index;
  }

  function D_Enter(e, index) {
    featureItemDragOver.current = index

    const cpArr = [...features]

    let finalArr = []

    cpArr.forEach(item => {
      finalArr.push({
        name: item.name,
        isDragging: false
      })
    })

    finalArr[index].isDragging = true;

    setFeatures(finalArr);
  }

  function D_End(e, index) {
    const arr1 = [...features]

    const feature_item_main = arr1[featureItemDrag.current]
    arr1.splice(featureItemDrag.current, 1)
    arr1.splice(featureItemDragOver.current, 0, feature_item_main)

    featureItemDrag.current = null;
    featureItemDragOver.current = null;

    let f_arr = []

    arr1.forEach(item => {
      f_arr.push({
        name: item.name,
        isDragging: false
      })
    })

    setFeatures(f_arr);
  }

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
          <CardContent>
            <ThemeProvider theme={theme}>
              <Stack spacing={2}>
                {/* <Stack spacing={1}>
                  <Typography>Max Distance Away (Miles)</Typography>
                  <Box width='50vh'>
                    <Slider
                      defaultValue={15}
                      valueLabelDisplay="auto"
                      min={0}
                      max={25}
                      onChange={handleDistanceChange}
                    />
                  </Box>
                </Stack> */}
                {/* <Stack spacing={1} >
                  <Typography>Cuisine Category</Typography>
                  <Box sx={{ width: '50vh' }}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                        sx={{ color: orange[500] }}
                      >
                        <MenuItem value='sushi'>Sushi</MenuItem>
                        <MenuItem value='mexican'>Mexican</MenuItem>
                        <MenuItem value='mediterranean'>Mediterranean</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack> */}
                {/* <Stack spacing={1}>
                  <Typography>Max Price Level</Typography>
                  <Box width='50vh'>
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
                </Stack> */}
              </Stack>
              {features.map((item, index) => (
                <React.Fragment>
                  <div draggable droppable onDragStart={e => D_Start(e, index)} onDragEnter={e => D_Enter(e, index)} onDragEnd={e => D_End(e, index)} className="feature-text" style={{backgroundColor: secColor, color: "black"}}>
                    <h3>{item.name}</h3>
                    {item.name == "Cost" ? (
                      <Stack spacing={1}>
                        <Typography>Max Price Level</Typography>
                        <Box width='50vh'>
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
                    ) :
                      item.name == "Distance" ? (
                        <Stack spacing={1}>
                          <Typography>Max Distance Away (Miles)</Typography>
                          <Box width='50vh'>
                            <Slider
                              defaultValue={15}
                              valueLabelDisplay="auto"
                              min={0}
                              max={25}
                              onChange={handleDistanceChange}
                            />
                          </Box>
                        </Stack>
                      ) :
                        item.name == "Rating" ? (
                          <></>
                        )
                          :
                          <></>}
                  </div>
                  {item.isDragging ? <div className="drag-indicator"></div> : null}
                </React.Fragment>
              ))}
            </ThemeProvider>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}


export default PreferenceCard;