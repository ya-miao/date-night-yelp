import { Box, Card, CardContent, InputLabel, MenuItem, FormControl, Select, Slider, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, yellow } from '@mui/material/colors';
import React, {useState, useRef} from "react"

const PreferenceCard = ({ oneUser, color }) => {
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
  const [features, setFeatures] = useState([
    {
      name: "Rating",
      isDragging: false 
    },
    {
      name: "Disatnce",
      isDragging: false 
    },
    {
      name: "Cost",
      isDragging: false 
    }
  ]);

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

  let featureItemDrag = useRef()
  let featureItemDragOver = useRef()    

  function D_Start(e,index){
    featureItemDrag.current = index;
  }

  function D_Enter(e,index){
    featureItemDragOver.current = index

    const cpArr = [...features]

    let finalArr = []

    cpArr.forEach(item=>{
      finalArr.push({
        name: item.name,
        isDragging: false
      })
    })

    finalArr[index].isDragging = true;

    setFeatures(finalArr);
  }

  function D_End(e,index){
    const arr1 = [...features]

    const feature_item_main = arr1[featureItemDrag.current]
    arr1.splice(featureItemDrag.current, 1)
    arr1.splice(featureItemDragOver.current, 0, feature_item_main)

    featureItemDrag.current = null;
    featureItemDragOver.current = null;

    let f_arr = []

    arr1.forEach(item=>{
      f_arr.push({
        name: item.name,
        isDragging: false
      })
    })

    setFeatures(f_arr);
}

  return (
    <Box sx={{ width: '75vh' }}>
      <Stack spacing={2} sx={{ mx: 2 }}>
        <Typography variant='overline'>{oneUser}</Typography>
        <Card style={{ backgroundColor: color, color: "white" }}>
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
                        sx={{color: orange[500]}}
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
              {features.map((item, index)=>(
                    <React.Fragment>

                    <h3 draggable droppable onDragStart={e=> D_Start(e,index)} onDragEnter={e=> D_Enter(e,index)} onDragEnd={e=> D_End(e,index)} className="feature-text">{item.name}</h3>
                    {item.isDragging ?  <div className="drag-indicator"></div> : null}
                   
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