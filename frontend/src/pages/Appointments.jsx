import ApptForm from '../components/ApptForm'
import ListAppointments from '../components/ListAppointments'
import Map from '../components/Map'
import Stack from '@mui/material/Stack';


export default function Appointments(shouldRedirect) {
 console.log('appointments render')
  return (
    <>
    <Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "stretch",
  }}>
      <br></br>
      {
        shouldRedirect ? 
         <> <ListAppointments/> <ApptForm /><Map></Map></>:
          <h2>You must be logged in</h2>
      }
      </Stack>
      <br></br>
    </>
  )
}