import { useState } from 'react';
import { signup } from '../api/authApi';
import {Navigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


export default function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [responseMsg, setResponseMsg] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const context = {username: formData.username, password: formData.password}
    const response = await signup(context)
    if(response.password) {
      setShouldRedirect(true)
    } else {
      setResponseMsg(response.username)
    }
  }

  if (shouldRedirect) {
    return <Navigate to="login"/>
  } else {
    return (
    <>
    <Stack sx={{justifyContent: "center", alignItems: "center",}}>
    <h2>Signup</h2>
    
    <form onSubmit={handleSubmit}>
        <div>
          <InputLabel  htmlFor="username">Usename</InputLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <br></br>
        <Button  variant="contained" type="submit">Signup</Button>
      </form>
    
    </Stack>
    </>
    )
    }
}