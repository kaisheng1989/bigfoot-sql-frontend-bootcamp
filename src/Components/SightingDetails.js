import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap/";

function SightingDetails() {
  const [sightingData, setSightingData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSightingData = async () => {
        const response = await axios.get(
          `http://localhost:3200/sightings/${id}`
        );
        setSightingData(response.data);
        console.log(sightingData)
      } 

    fetchSightingData();
  }, [id]);

  const handleGoToMain = () =>{
    navigate('/')
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      {/*d-flex make the container flexible. */}
      {sightingData ? (
        <>
          <Card className="w-50 h-100">
            <Card.Body>
              <Card.Title className="fs-5">
                Details for Sighting ID: {sightingData.id}
              </Card.Title>
              <Card.Body className="fs-6">
                Date: {sightingData.date}
                <br />
                Location: {sightingData.location}
                <br />
                Notes: {sightingData.notes}
              </Card.Body>
              </Card.Body>
            <Card.Footer className="fs-6">
              Created: {sightingData.createdAt}
              <br />
              Updated: {sightingData.updatedAt}
              <br />
              <br />
              <Button onClick={handleGoToMain}>Main Page</Button>
            </Card.Footer>
          </Card>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SightingDetails;
