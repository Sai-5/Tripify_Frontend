import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Anavbar from "./Anavbar";
import moment from "moment";
import "moment-timezone";

function CreateRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    description: "",
    image: "",
    timings: {
      open: "",
      close: "",
    },
    price: "",
    ratings: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdate = !!id;

  useEffect(() => {
    if (isUpdate) {
      axios
        .get(`http://localhost:7000/restaurant/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    }
  }, [id, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      timings: {
        ...prevData.timings,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = { ...formData };

      formDataToSend.timings.open = moment
        .tz(formData.timings.open, "HH:mm", "Asia/Kolkata")
        .format("hh:mm A");
      formDataToSend.timings.close = moment
        .tz(formData.timings.close, "HH:mm", "Asia/Kolkata")
        .format("hh:mm A");
      formDataToSend.price = Number(formData.price);
      if (isUpdate) {
        await axios.put(
          `http://localhost:7000/updaterestaurant/${id}`,
          formDataToSend
        );
        alert("Restaurant updated successfully");
      } else {
        await axios.post("http://localhost:7000/addrestaurant", formDataToSend);
        alert("Restaurant added successfully");
      }
      navigate("/restaurants");
    } catch (error) {
      console.error("Error adding/updating restaurant:", error);
    }
  };

  return (
    <div>
      <Anavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="mt-8 p-4 border rounded shadow-lg bg-gray-300 p-4 rounded-lg shadow-md"
          style={{ width: "45%" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isUpdate ? "Update Restaurant" : "Add Restaurant"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              className="mb-4"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <label className="block text-black-900 text-center">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Restaurant Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>
            </div>

            <div
              className="mb-4"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <label className="block text-black-900 text-center">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>

              <div>
                <label className="block text-black-900 text-center">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>
            </div>

            <p style={{ display: "flex", justifyContent: "center" }}>Timings</p>

            <div
              className="mb-4"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <label className="block text-black-900 text-center">Open</label>
                <input
                  type="time"
                  name="open"
                  placeholder="Open"
                  value={formData.timings.open}
                  onChange={handleTimingChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>

              <div>
                <label className="block text-black-900 text-center">
                  Close
                </label>
                <input
                  type="time"
                  name="close"
                  placeholder="Close"
                  value={formData.timings.close}
                  onChange={handleTimingChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black-900 text-center">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black-900 text-center">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black-900 text-center">
                Ratings
              </label>
              <input
                type="number"
                name="ratings"
                placeholder="Ratings"
                value={formData.ratings}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mt-4 mb-4">
              <label className="block text-black-900">Restaurant Image</label>
              <input
                type="text"
                name="image"
                placeholder="Image_Url"
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                required
                style={{ border: "1px solid black" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isUpdate ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRestaurant;
