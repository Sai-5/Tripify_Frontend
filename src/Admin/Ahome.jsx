import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Anavbar from "./Anavbar";

function Ahome() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [places, setPlaces] = useState([]);
  const [orders, setOrders] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios
      .get(`http://localhost:7000/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });

    // Fetch Hotel data
    axios
      .get(`http://localhost:7000/hotels`)
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings: ", error);
      });

    // Fetch restaurants data
    axios
      .get(`http://localhost:7000/restaurants`)
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings: ", error);
      });

    // Fetch places data
    axios
      .get(`http://localhost:7000/places`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings: ", error);
      });

    // Fetch Bookings data
    axios
      .get(`http://localhost:7000/bookings`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings: ", error);
      });

    // Fetch Trips data
    axios
      .get(`http://localhost:7000/alltrips`)
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trips: ", error);
      });
  }, []);

  const colors = ["#2B124C", "#AE4451", "#F39F5A", "orange"];

  // Calculate the number of users and bookings
  const totalUsers = users.length;
  const totalHotels = hotels.length;
  const totalRestaurants = restaurants.length;
  const totalPlaces = places.length;
  const totalOrders = orders.length;
  const totalTrips = trips.length;

  // Define data for the bar chart
  const data = [
    { name: "Users", value: totalUsers, fill: "lightgreen" },
    { name: "hotels", value: totalHotels, fill: "lightblue" },
    { name: "restaurants", value: totalRestaurants, fill: "yellow" },
    { name: "places", value: totalPlaces, fill: "red" },
    { name: "trips", value: totalTrips, fill: "purple" },
  ];
  return (
    <div>
      <Anavbar />
      <h3 className="text-center" style={{ color: "" }}>
        DashBoard
      </h3>
      <Card
        body
        style={{
          background: "white",
          width: "85%",
          marginLeft: "10%",
          marginTop: "20px",
          height: "580px",
        }}
      >
        <div className="flex justify-around items-center p-4">
          <Link to="/users" style={{ textDecoration: "none" }}>
            <div
              className=" rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{
                backgroundColor: "lightgreen",
                width: "200px",
                height: "130px",
              }}
            >
              USERS <br /> <br />
              {totalUsers}
            </div>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <div
              className=" bg-blue-300 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ width: "200px", height: "130px" }}
            >
              Hotels
              <br /> <br />
              {totalHotels}
            </div>
          </Link>

          <Link to="/restaurants" style={{ textDecoration: "none" }}>
            <div
              className="rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{
                backgroundColor: "yellow",
                width: "200px",
                height: "130px",
              }}
            >
              Restaurants <br /> <br />
              {totalRestaurants}
            </div>
          </Link>
          <Link to="/places" style={{ textDecoration: "none" }}>
            <div
              className=" bg-red-600 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ width: "200px", height: "130px" }}
            >
              Places <br /> <br />
              {totalPlaces}
            </div>
          </Link>
          <Link to="/alltrips" style={{ textDecoration: "none" }}>
            <div
              className=" bg-purple-600 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ width: "200px", height: "130px" }}
            >
              Trips <br /> <br />
              {totalTrips}
            </div>
          </Link>
        </div>
        <br />
        <br />
        <br />
        <div style={{ paddingLeft: "350px" }}>
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </div>
      </Card>
    </div>
  );
}

export default Ahome;
