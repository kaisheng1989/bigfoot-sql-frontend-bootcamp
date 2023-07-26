import React, {useState} from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css";
import {Button, Card } from "react-bootstrap/";
import SightingDetails from './SightingDetails';
import {Link} from 'react-router-dom'

function List() {
  const [sightings, setSightings] = useState([])
    const [newSighting, setNewSighting] = useState({
      date: "",
      location: "",
      notes: "",
    });

  const fetchData = async () =>{
      const response = await axios.get('http://localhost:3200/sightings')
      setSightings(response.data)
    }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSighting({
      ...newSighting,
      [name]: value,
    });
  };

 const addSighting = async () => {
   try {
     await axios.post("http://localhost:3200/sightings", newSighting);
     fetchData();
     setNewSighting({
       date: "",
       location: "",
       notes: "",
     });
   } catch (error) {
     console.error("Error adding sighting:", error);
     // Display a user-friendly error message here.
   }
 };
  const editSighting = async (id, updatedSighting) => {
    try {
      await axios.put(`http://localhost:3200/sightings/${id}`, updatedSighting);
      fetchData();
    } catch (error) {
      console.error("Error editing sighting:", error);
      // Display a user-friendly error message here.
    }
  };

 
  return (
    <div>
      <div>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newSighting.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newSighting.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newSighting.notes}
          onChange={handleInputChange}
        />
        <Button onClick={addSighting}>Add New Sighting</Button>
      </div>
      <Button onClick={fetchData}>Show List</Button>
      {sightings.map((item, index) => {
        return (
          <Card key={index}>
            <Card.Body>
              <Card.Title className="fs-6">{item.id}</Card.Title>
              <Card.Body className="fs-6">
                Date:{item.date} <br />
                <Link to={`/details/${item.id}`}>
                  <Button>More Details</Button>
                </Link>
                {/*Note:{item.notes}*/}
              </Card.Body>
            </Card.Body>
            <Card.Footer className="fs-6">
              Created:{item.createdAt}
              <br />
              Updated: {item.updatedAt}
              <br />
            
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}

export default List