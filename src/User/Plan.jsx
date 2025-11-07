import React, { useEffect, useState } from "react";
import axios from "axios";
import Unavbar from "./Unavbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Plan() {
  const [bookings, setBookings] = useState([]);
  const [showTripPlan, setShowTripPlan] = useState(false);
  const [trips, setTrips] = useState([]);

  // Helper function to parse date strings in YYYY-MM-DD format or Date objects
  const parseDate = (date) => {
    if (date instanceof Date) {
      return date;
    }
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`http://localhost:7000/getplans/${user.id}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((error) => {
          console.log("Failed to fetch plans:", error);
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
      try {
        await axios.post("http://localhost:7000/createtrip", {
          userId: user.id,
          plans: sortedBookings,
        });
        alert("Trip created successfully!");
        setShowTripPlan(true);
      } catch (error) {
        console.error("Error creating trip:", error);
        alert("Failed to create trip.");
      }
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = parseDate(a.BookingDate);
    const dateB = parseDate(b.BookingDate);
    const dateDiff = dateA.getTime() - dateB.getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    const timeA = a.reservationTime || "00:00";
    const timeB = b.reservationTime || "00:00";
    const [hourA, minA] = timeA.split(":").map(Number);
    const [hourB, minB] = timeB.split(":").map(Number);
    if (hourA !== hourB) {
      return hourA - hourB;
    }
    return minA - minB;
  });

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
            Make My Trip
          </button>
          {trips.length > 0 && (
            <Link to="/mytrips">
              <button
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                My Trips
              </button>
            </Link>
          )}
        </div>
        {bookings.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {sortedBookings.map((booking) => (
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
                  {new Date(booking.BookingDate).toLocaleDateString()}
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
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No plans found.</p>
        )}
        {showTripPlan && (
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              My Trip Collections
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {sortedBookings.map((booking, index) => (
                <div
                  key={booking._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {index + 1}
                  </div>
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
                    {new Date(booking.BookingDate).toLocaleDateString()}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Plan;
