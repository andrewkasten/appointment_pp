import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Appointments from './pages/Appointments';
// import Logout from './pages/Logout'
import Form from "./components/Form"
import {Container, createTheme, ThemeProvider} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const themeGreen = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#2e797d',
    },
    error: {
      main: '#7d2e79',
    },
    info: {
      main: '#322e7d',
    },
  },
};

const myTheme = createTheme(themeGreen);


function App() {

const [formData, setFormData] = useState({ username: '', password: '' });
  // const [userToken, setUserToken] = useState(null)

  // const handleToken = (token) => {
  //   setFormData({ username: '', password: '' })
  //   setUserToken(token)
  //   localStorage.setItem('token', token)
  // }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 return (
    <>
    <CssBaseline />
    <ThemeProvider theme={myTheme}>
      <Container fixed>
     <Router>
            <div >
              <main> 
              <Navbar/>
              <Routes>
                <Route path="/appointments" element={<Appointments/>} /> 
                <Route path="/signup" element={<Signup handleInputChange={handleInputChange} formData={formData} /> } /> 
                <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} />} /> 
                {/* <Route path="/logout" element={<Logout userToken={userToken} setUserToken={setUserToken}/>} />  */}
            </Routes>
            </main>
            </div>
          </Router> 
          </Container>
          </ThemeProvider>
    </>

  )
}

export default App
