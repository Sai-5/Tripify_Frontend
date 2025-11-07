import React, { useState, useEffect } from "react";
import "./Testimonials.css";
import Unavbar from "./Unavbar";
import Footer from "../Components/Footer";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ text: "", name: "", image: "" });

  useEffect(() => {
    axios.get("http://localhost:7000/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  const handleAddReview = () => {
    if (newReview.text && newReview.name && newReview.image) {
      axios.post("http://localhost:7000/addreview", newReview).then((res) => {
        setReviews([...reviews, res.data]);
        setNewReview({ text: "", name: "", image: "" });
        setShowModal(false);
      });
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>
      <br />
      <h2 className="text-center">What Our Customers Say</h2>
      <br />
      <div className="text-center">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Review
        </Button>
      </div>
      <br />
      {reviews.map((review, index) => (
        <div key={index}>
          <div style={{ display: "flex" }}>
            {index % 2 === 0 ? (
              <>
                <div style={{ width: "55%", paddingLeft: "150px" }}>
                  <p style={{ fontSize: "22px" }}>
                    "{review.text}"
                    <p style={{ display: "flex", justifyContent: "flex-end" }}>
                      ~ {review.name}.
                    </p>
                  </p>
                </div>
                <div style={{ width: "40%", paddingLeft: "110px" }}>
                  <img
                    src={review.image}
                    style={{ width: "400px", height: "250px" }}
                    alt={review.name}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "40%", paddingLeft: "150px" }}>
                  <img
                    src={review.image}
                    style={{ width: "400px", height: "250px" }}
                    alt={review.name}
                  />
                </div>
                <div style={{ width: "55%", paddingLeft: "30px" }}>
                  <p style={{ fontSize: "22px" }}>
                    "{review.text}"
                    <p style={{ display: "flex", justifyContent: "flex-end" }}>
                      ~ {review.name}.
                    </p>
                  </p>
                </div>
              </>
            )}
          </div>
          <br />
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reviewText">
              <Form.Label>Review Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="reviewName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="reviewImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newReview.image}
                onChange={(e) =>
                  setNewReview({ ...newReview, image: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddReview}>
            Add Review
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
      <Footer />
    </div>
  );
};

export default Testimonials;
