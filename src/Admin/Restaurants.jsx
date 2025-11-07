import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Card } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Anavbar from "./Anavbar";
// import "./users.css"

const Restaurants = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7000/restaurants`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log("error in getting Restaurants");
      });
  }, []);

  const deleteData = (taskId) => {
    axios.delete(`http://localhost:7000/deleterestaurant/${taskId}`);
    window.location.assign("/users");
    alert("User is deleted");
  };

  return (
    <div>
      <Anavbar />
      <br />
      <h1 className="text-center">Restaurants</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "100px",
          marginBottom: "25px",
        }}
      >
        <Button onClick={() => navigate("/createrestaurant")}>
          Add Restaurant
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table striped bordered hover variant="dark" style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>sl/no</th>
              <th>Hotel Name</th>
              <th>Ratings</th>
              <th>Address</th>
              <th>Description</th>
              <th>Price</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.ratings}</td>
                <td>
                  {item.address.slice(0, 20)} <br />
                  {item.address.slice(20, 40)}
                  <br />
                  {item.address.slice(40, 60)}
                  <br />
                  {item.address.slice(60)}
                </td>
                <td>
                  {item.description.slice(0, 30)}
                  <br />
                  {item.description.slice(30, 60)}
                  <br />
                  {item.description.slice(60, 80)}
                  <br />
                  {item.description.slice(80, 100)}...
                </td>
                <td>{item.price}</td>
                <td>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button
                      onClick={() => navigate(`/updaterestaurant/${item._id}`)}
                      style={{
                        border: "none",
                        color: "blue",
                        background: "none",
                      }}
                    >
                      <FaEdit />
                    </button>
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

export default Restaurants;
