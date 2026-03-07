import { useState, useEffect } from "react";
import {List, ListItem, Button} from "@mui/material";
import axios from "axios";
export default function ListAppointments() {
    const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [appts, setAppts] = useState([]);
  const fetchAppt = async () => {
    const response = await fetch("http://localhost:8000/api/appointments/");
    const json = await response.json();
    console.log(json);
    setAppts(json);
  };
  useEffect(() => {
    fetchAppt().catch(console.error);
    console.log("effect ran");
  }, []);

const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/appointments/${id}/`);
        fetchAppt();
    };


//   function deleteAppointment(id) {
//   return request(`http://localhost:8000/api/appointments/${id}/`, {
//     method: "DELETE",
//   });
// }

  // async function handleDelete(id) {
  //   if (!window.confirm("Delete this appointment?")) return;
  //   setError("");
  //   try {
  //     await deleteAppointment(id);
  //     if (editingId === id) resetForm();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // }
  return (
    <>
    <h1>Appointments</h1>
    <List>
      {appts.map((appointment, index) => (
        <>
        <ListItem key={index}>
          {appointment.name} - {appointment.date} - {appointment.time} - {appointment.lat} - {appointment.long}
        </ListItem>
        <Button onClick={() => handleDelete(appointment.id)}>Delete</Button>
          </>
      ))}
    </List>
    </>

  );
}
