// Destinations.jsx

import React, { useEffect, useState } from "react";
import Unavbar from "./Unavbar";
import axios from "axios";
import "./user.css"; // Import the stylesheet
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const Destinations = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:7000/hotels").then((res) => {
      setHotels(res.data);
    });

    axios.get("http://localhost:7000/restaurants").then((res) => {
      setRestaurants(res.data);
    });

    axios.get("http://localhost:7000/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPlaces = places.filter((place) =>
    place.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div className="search-container">
            <input
              style={{
                backgroundColor: "lightgray",
                width: "25%",
                outline: "none",
              }}
              type="text"
              placeholder="Search by Destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredHotels.length ||
        filteredRestaurants.length ||
        filteredPlaces.length ? (
          <div className="results-container">
            <div className="category-container">
              <div className="result-category">
                <h1>Hotels</h1>
                <br />
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "30px",
                    padding: "10px",
                  }}
                >
                  {filteredHotels.map((hotel, index) => (
                    <div
                      key={hotel._id}
                      className="bg-white p-4 rounded shadow transition duration-300 transform hover:scale-105"
                      style={{ width: "350px" }}
                    >
                      <img
                        src={hotel.image}
                        alt="Item Image"
                        className="rounded-t-lg"
                        style={{ height: "200px", width: "300px" }}
                      />
                      <div className="mt-4">
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Name:
                          </span>{" "}
                          {hotel.name}
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Address:
                          </span>{" "}
                          <span>{hotel.address}</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Description:
                          </span>{" "}
                          <span>{hotel.description.slice(0, 65)}...</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Type:
                          </span>{" "}
                          <span>{hotel.type}</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Normal_Suite:
                          </span>{" "}
                          <span className="text-blue-500">
                            ₹ {hotel.price?.normal_suite || 0}
                          </span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Vip_Suite:
                          </span>{" "}
                          <span className="text-blue-500">
                            ₹ {hotel.price?.vip_suite || 0}
                          </span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Ratings:
                          </span>{" "}
                          <span className="text-grey-500">{hotel.ratings}</span>
                        </p>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            style={{
                              backgroundColor: "purple",
                              border: "none",
                            }}
                            onClick={() => {
                              navigate(`/bookhotel/${hotel._id}`);
                            }}
                          >
                            Add Hotel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <br />
              <div className="result-category">
                <h1>Restaurants</h1>
                <br />
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "30px",
                    padding: "10px",
                  }}
                >
                  {filteredRestaurants.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-white p-4 rounded shadow transition duration-300 transform hover:scale-105"
                      style={{ width: "350px" }}
                    >
                      <img
                        src={item.image}
                        alt="Item Image"
                        className="rounded-t-lg"
                        style={{ height: "200px", width: "300px" }}
                      />
                      <div className="mt-4">
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Name:
                          </span>{" "}
                          {item.name}
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Address:
                          </span>{" "}
                          <span>{item.address}</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Description:
                          </span>{" "}
                          <span>{item.description.slice(0, 65)}...</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Timings:
                          </span>{" "}
                          <span>
                            {item.timings.open}-{item.timings.close}
                          </span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Ratings:
                          </span>{" "}
                          <span>{item.ratings}</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Price:
                          </span>{" "}
                          <span className="text-blue-500">
                            ₹ {item.price || 0}
                          </span>
                        </p>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            style={{
                              backgroundColor: "purple",
                              border: "none",
                            }}
                            onClick={() => {
                              navigate(`/bookrestaurant/${item._id}`);
                            }}
                          >
                            Add Restaurant
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <div className="result-category">
                <h1>Places</h1>
                <br />
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "30px",
                    padding: "10px",
                  }}
                >
                  {filteredPlaces.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-white p-4 rounded shadow transition duration-300 transform hover:scale-105"
                      style={{ width: "350px" }}
                    >
                      <img
                        src={item.image}
                        alt="Item Image"
                        className="rounded-t-lg"
                        style={{ height: "200px", width: "300px" }}
                      />
                      <div className="mt-4">
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Name:
                          </span>{" "}
                          {item.name}
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Address:
                          </span>{" "}
                          <span>{item.address}</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Description:
                          </span>{" "}
                          <span>{item.description.slice(0, 50)}...</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Timings:
                          </span>{" "}
                          <span>
                            {item.timings.open}-{item.timings.close}
                          </span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Ratings:
                          </span>{" "}
                          <span>{item.ratings}</span>
                        </p>
                        <p>
                          <span className="text-grey-500 font-bold ">
                            Price:
                          </span>{" "}
                          <span className="text-blue-500">
                            ₹ {item.price || 0}
                          </span>
                        </p>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            style={{
                              backgroundColor: "purple",
                              border: "none",
                            }}
                            onClick={() => {
                              navigate(`/bookplace/${item._id}`);
                            }}
                          >
                            Add Place
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "170px",
            }}
          >
            <h1>No Data Found</h1>
          </div>
        )}
      </div>
      <div></div>

      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Destinations;
