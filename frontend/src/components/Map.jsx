 
 import "leaflet/dist/leaflet.css";
import { useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { setKey, fromAddress, setLocationType, geocode, RequestType,} from "react-geocode";
import {Button, TextField, Box} from '@mui/material';
import Stack from '@mui/material/Stack';
import '../App.css'
import ListAppointments from './ListAppointments'
import axios from "axios";

 
 export default function Map(){
//  const [lat, setLat] = useState('')
//  const [lng, setLng] = useState('')
 const [appointments, setAppointments] = useState('')

  // const apptObject = {
  //     name: name,
  //     date: date,
  //     time: time,
  //     description: description,
  //     street_1: street1,
  //     street_2: street2,
  //     city: city,
  //     state: state,
  //     zip_code: zipCode,
  //     lat: lat,
  //     long: lng,
  //   };

    const fetchAppointments = async () => {
        const response = await axios.get("http://localhost:8000/api/appointments/")
        setAppointments(response.data)
        
        return appointments
        
    }
    useEffect(() => {
      fetchAppointments();
      {appointments.map((appointment) => (
        console.log('appointment',appointment)
      ))}
      console.log("effect ran")
  }, []);
  console.log('appointments',appointments)
 return (
 <>
 <h2>Map</h2>
          <MapContainer 
          center={[40.33382623789043, -111.74364469784359]}
          zoom={5}
          style={{ height: "50vh", width: "80%" }}
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         {/* {appointments.map((appointment) => (
          <Marker key={appointment.id} position={[appointment.lat, appointment.long]} />
         ))} */}
        </MapContainer>

</>
)}