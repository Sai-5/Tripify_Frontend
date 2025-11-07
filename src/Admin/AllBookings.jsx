import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Card } from "react-bootstrap";
import Anavbar from "./Anavbar";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/bookings`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings: ", error);
      });
  }, []);

  const calculateStatus = (date) => {
    const currentDate = new Date();
    const formattedCheckInDate = new Date(date);

    if (formattedCheckInDate >= currentDate) {
      return "Upcoming";
    } else {
      return "Completed";
    }
  };

  return (
    <div>
      <Anavbar />
      <br />
      <h1 className="text-center">All Bookings</h1> <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
          <thead>
            <tr>
              <th>Sl/No</th>
              <th>Booking ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Hotel Name</th>
              <th>Rooms</th>
              <th>Check-In Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item, index) => {
              const status = calculateStatus(item.checkIn);
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item._id.slice(0, 10)}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.hotelName}</td>
                  <td>{item.rooms}</td>
                  <td>{item.checkIn}</td>
                  <td>₹{item.totalamount}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllBookings;
