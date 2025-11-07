import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Card } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Anavbar from "./Anavbar";
// import "./users.css"

const Users = () => {
  const [usertrips, setUsertrips] = useState([]);
  const [users, setUsers] = useState([]);

  const [showTrips, setShowTrips] = useState(false);

  const toggleTrips = () => {
    setShowTrips(!showTrips);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:7000/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {});
  }, []);

  const deleteData = (taskId) => {
    axios.delete(`http://localhost:7000/userdelete/${taskId}`);
    window.location.assign("/users");
    alert("User is deleted");
  };

  const fetchUserTrips = (userId) => {
    axios
      .get(`http://localhost:7000/gettrip/${userId}`)
      .then((response) => {
        setUsertrips(response.data);
        toggleTrips(); // Show Trips when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user trips:", error);
      });
  };

  return (
    <div>
      <Anavbar />
      <br />
      <h1 className="text-center">Users</h1> <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table striped bordered hover variant="dark" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th>sl/no</th>
              <th>UserId</th>
              <th>User name</th>
              <th>Email</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button
                      onClick={() => deleteData(item._id)}
                      style={{
                        border: "none",
                        color: "red",
                        background: "none",
                      }}
                    >
                      <FaTrash />
                    </button>
                    <Button
                      onClick={() => fetchUserTrips(item._id)}
                      style={{ marginBottom: "12px" }}
                    >
                      view trips
                    </Button>
                  </div>
                  <div style={{ display: "flex" }}>
                    {showTrips && (
                      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
                        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                        <div
                          className="bg-white p-4 rounded-lg z-10 relative"
                          style={{ maxHeight: "80vh", overflowY: "scroll" }}
                        >
                          <p className="text-sm text-gray-600">
                            <div
                              className="container mx-auto mt-8"
                              style={{ width: "1350px" }}
                            >
                              <h1 className="text-center text-blue-300">
                                User Trips
                              </h1>
                              {usertrips.map((trip) => (
                                <Card
                                  key={trip._id}
                                  style={{
                                    width: "90%",
                                    marginLeft: "65px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                    paddingTop: "15px",
                                    marginBottom: "35px",
                                  }}
                                >
                                  <div style={{ padding: "10px" }}>
                                    <h3>Trip ID: {trip._id.slice(0, 10)}</h3>
                                    <p>
                                      Created At:{" "}
                                      {new Date(
                                        trip.createdAt
                                      ).toLocaleDateString()}
                                    </p>
                                    <h4>Plans:</h4>
                                    {trip.plans.map((plan, index) => (
                                      <div
                                        key={index}
                                        style={{
                                          marginBottom: "10px",
                                          border: "1px solid #ccc",
                                          padding: "10px",
                                        }}
                                      >
                                        <p>Hotel Name: {plan.hotelName}</p>
                                        <p>Address: {plan.address}</p>
                                        <p>Description: {plan.description}</p>
                                        <p>Booking Date: {plan.BookingDate}</p>
                                        <p>Check-In: {plan.checkIn}</p>
                                        <p>Total Amount: ₹{plan.totalamount}</p>
                                        <p>User Name: {plan.userName}</p>
                                        <p>Email: {plan.email}</p>
                                        <p>Phone: {plan.phno}</p>
                                      </div>
                                    ))}
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </p>
                          <Button onClick={toggleTrips} className="mt-4">
                            Close
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
