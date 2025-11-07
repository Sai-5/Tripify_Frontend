import React, { useEffect, useState } from "react";
import axios from "axios";
import Unavbar from "./Unavbar";
import Footer from "../Components/Footer";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  // Helper function to parse date strings
  const parseDate = (dateString) => {
    if (!dateString) return "N/A";
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Try parsing DD/MM/YYYY format
      const parts = dateString.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        date = new Date(year, month, day);
      }
    }
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Trips</h1>
        {trips.length > 0 ? (
          trips.map((trip, tripIndex) => (
            <div key={trip._id} style={{ marginBottom: "40px" }}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Trip {tripIndex + 1} - Created on{" "}
                {new Date(trip.createdAt).toLocaleDateString()}
              </h2>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>📍</span>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2c3e50",
                      }}
                    >
                      Pickup: {trip.pickup}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "2px",
                      height: "30px",
                      backgroundColor: "#3498db",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>🏁</span>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2c3e50",
                      }}
                    >
                      Destination: {trip.destination}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#e74c3c",
                  }}
                >
                  Total Price of Trip: ₹
                  {trip.plans.reduce(
                    (sum, plan) => sum + Number(plan.totalamount),
                    0
                  )}
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {trip.plans.map((plan, index) => (
                  <div
                    key={plan._id}
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
                      src={plan.image}
                      alt={plan.hotelName}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                    <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                      {plan.hotelName}
                    </h3>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                      <strong>Address:</strong> {plan.address}
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                      <strong>Description:</strong>{" "}
                      {plan.description.slice(0, 100)}...
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                      <strong>Date:</strong> {parseDate(plan.BookingDate)}
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                      <strong>Time:</strong> {plan.reservationTime || "N/A"}
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                      <strong>Guests:</strong> {plan.rooms}
                    </p>
                    <p
                      style={{
                        margin: "5px 0",
                        fontSize: "14px",
                        color: "#e74c3c",
                      }}
                    >
                      <strong>Total Amount:</strong> ₹{plan.totalamount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No trips found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyTrips;
