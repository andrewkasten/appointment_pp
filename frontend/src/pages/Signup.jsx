import Form from "../components/Form"
import { useState } from 'react';
import { signup } from '../api/authApi';
import {Navigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';



export default function Signup({handleInputChange, formData}) {

  const [responseMsg, setResponseMsg] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)


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
    return <Navigate to="/appointments"/>
  } else {
    return (
    <>
    <Stack sx={{justifyContent: "center", alignItems: "center",}}>
    <h2>Signup</h2>
    <Form formType={"Signup"} handleInputChange={handleInputChange} formData={formData} handleSubmit={handleSubmit} responseMsg={responseMsg}/>
    </Stack>
    </>
    )
    }
}