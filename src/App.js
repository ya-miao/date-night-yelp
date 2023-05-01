import logo from './logo.svg';
import './App.css';

import { Container } from '@mui/material';

import CoupleYelp from './pages/CoupleYelp';

const App = () => {
  return (
    <Container sx={{ my: 4 }}>
      <CoupleYelp />
    </Container>
  );
};

export default App;
