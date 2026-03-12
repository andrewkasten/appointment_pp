import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { setKey, fromAddress, setLocationType } from "react-geocode";
import {Button,TextField,Box,List,ListItem,Card,CardContent,Grid} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

export default function Appointments({}) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const response = await axios.get("http://localhost:8000/api/appointments/");
    setAppointments(response.data);
    return appointments;
  };
  useEffect(() => {
    fetchAppointments();
    console.log("effect ran");
  }, []);

function formatDate(str){
  const date = str.split('-')
  return `${date[1]}-${date[2]}-${date[0]}`

}

function time12(str){

  str = new Date('1970-01-01T' + str + 'Z').toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})
  
  return str
}
  function ListAppointments() {
    const handleDelete = async (id) => {
      await axios.delete(`http://localhost:8000/api/appointments/${id}/`);
      fetchAppointments();
    };

    return (
      <>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <h1>Appointments</h1>

            {appointments.map((appointment, index) => (
              <>
                <List>
                  <ListItem key={index}>
                   
                    {appointment.name} on {formatDate(appointment.date)}{" "}
                    at {time12(appointment.time)}
                  </ListItem>
                  <ListItem> {appointment.street_1}</ListItem>
                  <Button variant="outlined" onClick={() => handleDelete(appointment.id)}>
                    Delete
                  </Button>
                </List>
              </>
            ))}
          </CardContent>
        </Card>
      </>
    );
  }

  setKey(import.meta.env.VITE_GEOCODE_KEY);
  setLocationType("ROOFTOP");

  function ApptForm() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [street1, setStreet1] = useState("");
    const [street2, setStreet2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    async function handleSubmit() {
      const appointmentObject = {
        name: name,
        date: date,
        time: time,
        description: description,
        street_1: street1,
        street_2: street2,
        city: city,
        state: state,
        zip_code: zipCode,
        lat: lat,
        long: lng,
      };

      await fromAddress(`${street1} ${street2} ${city} ${state} ${zipCode}`)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          appointmentObject.lat = lat;
          appointmentObject.long = lng;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log("apptObj", appointmentObject);
      // setAppointments((prev) => [...prev,{appointmentObject},]);

      await axios.post(
        "http://localhost:8000/api/appointments/",
        appointmentObject,
      );

      fetchAppointments();
    }
    return (
      <>
        <Card sx={{ maxWidth: 550 }}>
          <CardContent>
            <h3>New Appointment</h3>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 0.4, width: "26ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="date"
                pattern="\d{2}-\d{2}-\d{4}"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <TextField
                label="Street"
                value={street1}
                onChange={(e) => setStreet1(e.target.value)}
              />
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <TextField
                label="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <TextField
                label="Notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  function Map() {
    return (
      <>
        <Card>
          <CardContent>
            <h2>Map</h2>
            <MapContainer
              center={[40.33382623789043, -111.74364469784359]}
              zoom={11}
              style={{ height: "50vh", width: "100vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {appointments.map((appointment) => (
                <Marker
                  key={appointment.id}
                  position={[appointment.lat, appointment.long]}
                >
                  <Popup>
                    {appointment.name}
                    <br />
                    {formatDate(appointment.date)} <br /> {appointment.street_1} <br />{" "}
                    {time12(appointment.time)}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>
      </>
    );
  }
  console.log("appointments", appointments);
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", alignItems: "stretch" }}
      >
        <br></br>{" "}
        {localStorage.getItem("token") ? (
          <>
            <ApptForm />
            <ListAppointments />
            <Map />
          </>
        ) : (
          <h2>You must be logged in</h2>
        )}
      </Grid>
      <br></br>
    </>
  );
}
