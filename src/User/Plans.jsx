import React, { useEffect, useState } from "react";
import axios from "axios";
import Unavbar from "./Unavbar";
import Footer from "../Components/Footer";
import { Button } from "react-bootstrap";

function Plans() {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`http://localhost:7000/getplans/${user.id}`)
        .then((res) => {
          setBookings(res.data);
          const total = res.data.reduce(
            (sum, booking) => sum + parseInt(booking.totalamount),
            0
          );
          setTotalAmount(total);
        })
        .catch((error) => {
          console.log("Failed to fetch bookings:", error);
        });

      axios
        .get(`http://localhost:7000/gettrip/${user.id}`)
        .then((res) => {
          setTrips(res.data);
        })
        .catch((error) => {
          console.log("Failed to fetch trips:", error);
        });
    }
  }, []);

  const handleMakeTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (!pickup || !destination) {
        alert("Please enter both pickup and destination locations.");
        return;
      }
      try {
        await axios.post("http://localhost:7000/createtrip", {
          userId: user.id,
          plans: bookings,
          pickup,
          destination,
        });
        const totalAmount = bookings.reduce(
          (sum, booking) => sum + parseInt(booking.totalamount),
          0
        );
        alert(`Payment successful! Total amount: ₹${totalAmount}`);
        // Reset pickup and destination inputs
        setPickup("");
        setDestination("");
        // Refresh plans to confirm they are empty
        axios
          .get(`http://localhost:7000/getplans/${user.id}`)
          .then((res) => {
            setBookings(res.data);
          })
          .catch((error) => {
            console.log("Failed to fetch plans:", error);
          });
        // Refresh trips
        axios
          .get(`http://localhost:7000/gettrip/${user.id}`)
          .then((res) => {
            setTrips(res.data);
          })
          .catch((error) => {
            console.log("Failed to fetch trips:", error);
          });
      } catch (error) {
        console.error("Error creating trip:", error);
        alert("Failed to create trip.");
      }
    }
  };

  const handleDeletePlan = async (planId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        await axios.delete(`http://localhost:7000/deleteplan/${planId}`);
        alert("Plan deleted successfully");
        // Refresh plans
        axios
          .get(`http://localhost:7000/getplans/${user.id}`)
          .then((res) => {
            setBookings(res.data);
            const total = res.data.reduce(
              (sum, booking) => sum + parseInt(booking.totalamount),
              0
            );
            setTotalAmount(total);
          })
          .catch((error) => {
            console.log("Failed to fetch plans:", error);
          });
      } catch (error) {
        console.error("Error deleting plan:", error);
        alert("Failed to delete plan.");
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Plans</h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              style={{
                backgroundColor: "lightgray",
                width: "20%",
                outline: "none",
                marginRight: "10px",
                padding: "10px",
              }}
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              style={{
                backgroundColor: "lightgray",
                width: "20%",
                outline: "none",
                padding: "10px",
              }}
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        {bookings.length > 0 ? (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={booking.image}
                    alt={booking.hotelName}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                    {booking.hotelName}
                  </h3>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Address:</strong> {booking.address}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Description:</strong>{" "}
                    {booking.description.slice(0, 100)}...
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Date:</strong>{" "}
                    {booking.checkIn ||
                      new Date(booking.BookingDate).toLocaleDateString()}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Time:</strong> {booking.reservationTime || "N/A"}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Guests:</strong> {booking.rooms}
                  </p>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "14px",
                      color: "#e74c3c",
                    }}
                  >
                    <strong>Total Amount:</strong> ₹{booking.totalamount}
                  </p>
                  <button
                    onClick={() => handleDeletePlan(booking._id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                Total Price of All Plans: ₹{totalAmount.toString()}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No plans found.</p>
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleMakeTrip}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Plans;
