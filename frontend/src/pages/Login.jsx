import { useState } from 'react'
import { login } from '../api/authApi';
import { Navigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export default function Login({}) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [responseMsg, setResponseMsg] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [userToken, setUserToken] = useState(null)

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)
    localStorage.setItem('token', token)
  }
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
    const token = await login(context)
    if(!token) {
      setResponseMsg("Error logging in")
    } else {
      handleToken(token)
      setShouldRedirect(true)
      localStorage.setItem('token', token)
    }
  }
  if (shouldRedirect) {
    return <Navigate to="/appointments"/>
  } else {
    return (
    <>
    <Stack sx={{justifyContent: "center", alignItems: "center",}}>
    <h2>Login</h2>

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
        <Button  variant="contained" type="submit">Login</Button>
      </form>
  </Stack>
  </>  
  )
  }
}