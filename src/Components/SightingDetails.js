import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap/";

function SightingDetails() {
  const [sightingData, setSightingData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSightingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3200/sightings/${id}`
        );
        setSightingData(response.data);
        setEditDate(response.data.date);
        setEditLocation(response.data.location);
        setEditNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching sighting data:", error);
      }
    };

    fetchSightingData();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3200/sightings/${id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditDate(sightingData.date);
    setEditLocation(sightingData.location);
    setEditNotes(sightingData.notes);
  };

  const handleSaveSighting = async () => {
    try {
      const updatedSighting = {
        date: editDate,
        location: editLocation,
        notes: editNotes,
      };
      await axios.put(`http://localhost:3200/sightings/${id}`, updatedSighting);
      setSightingData({
        ...sightingData,
        date: editDate,
        location: editLocation,
        notes: editNotes,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving sighting:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3200/sightings/${id}/comments`,
        { content: newComment }
      );

      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleGoToMain = () => {
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {sightingData ? (
        <Card className="w-50 h-100">
          <Card.Body>
            <Card.Title className="fs-5">
              Details for Sighting ID: {sightingData.id}
            </Card.Title>
            {isEditing ? (
              <>
                <Card.Body>
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                </Card.Body>
                <Card.Body>
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                  />
                </Card.Body>
                <Card.Body>
                  <label>Notes:</label>
                  <textarea
                    name="notes"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                </Card.Body>
                <Button variant="info" onClick={handleSaveSighting}>
                  Save
                </Button>
              </>
            ) : (
              <Card.Body className="fs-6">
                Date: {sightingData.date}
                <br />
                Location: {sightingData.location}
                <br />
                Notes: {sightingData.notes}
              </Card.Body>
            )}
          </Card.Body>

          <Card.Title className="fs-5">Comments</Card.Title>
          {comments.map((comment) => (
            <Card.Text key={comment.id}>{comment.content}</Card.Text>
          ))}

          <Card.Footer className="fs-6">
            Created: {sightingData.createdAt}
            <br />
            Updated: {sightingData.updatedAt}
            <br />
            <br />
            {isEditing ? (
              <Button variant="danger" onClick={handleCancelEditing}>
                Cancel
              </Button>
            ) : (
              <>
                <Button variant="info" onClick={handleStartEditing}>
                  Edit
                </Button>
                <Button variant="primary" onClick={handleGoToMain}>
                  Main Page
                </Button>
              </>
            )}
          </Card.Footer>

          <Card.Title className="fs-5">Add Comment</Card.Title>
          <form onSubmit={handleAddComment}>
            <div className="mb-3">
              <textarea
                name="content"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </div>
            <Button variant="info" type="submit">
              Add Comment
            </Button>
          </form>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SightingDetails;
