import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import {
  setKey,
  fromAddress,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { Button, TextField, Box } from "@mui/material";
import "../App.css";
import ListAppointments from "./ListAppointments";


setLocationType("ROOFTOP");

export default function ApptForm() {
  const [fullAddress, setFullAddress] = useState("");

  const [geocodeResult, setGeocodeResult] = useState("");

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [errors, setErrors] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

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

    setFullAddress(`${street1} ${street2} ${city} ${state} ${zipCode}`);
    setAppointments((prev) => [
      ...prev,
      { name, date, time, description, street1, street2, city, state, zipCode, lat, lng },
    ]);

    fromAddress(fullAddress)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log(results[0].geometry.location);
      setLat(lat);
      setLng(lng);
      setGeocodeResult(results[0].geometry.location);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    })
    .catch((error) => {
      console.error(error);
    });
    
    await fetch("http://localhost:8000/api/appointments/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(appointmentObject),
    });

   
  }

  return (
    <>
      <h3>New Appointment</h3>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 0.5, width: "50ch" } }}
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
          label="Street cont."
          value={street2}
          onChange={(e) => setStreet2(e.target.value)}
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
        <br></br>
        <Button align="left" variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </>
  );
}
