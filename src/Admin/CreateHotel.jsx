import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateHotel() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
    description: "",
    image: "",
    type: "",
    price: {
      normal_suite: 0,
      vip_suite: 0,
    },
    ratings: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdate = !!id;

  useEffect(() => {
    if (isUpdate) {
      axios
        .get(`http://localhost:7000/hotel/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching hotel data:", error);
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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      price: {
        ...prevData.price,
        [name]: Number(value),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await axios.put(`http://localhost:7000/updatehotel/${id}`, formData);
        alert("Hotel updated successfully");
      } else {
        await axios.post("http://localhost:7000/addhotel", formData);
        alert("Hotel added successfully");
      }
      navigate("/hotels");
    } catch (error) {
      console.error("Error adding/updating event : ", error);
    }
  };

  return (
    <div>
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
            {isUpdate ? "Update Hotel" : "Add Hotel"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              className="mb-4"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <label className="block text-black-900 text-center">
                  Hotel Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="HotelName"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>
              <div>
                <label className="block text-black-900 text-center">
                  Hotel Type
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <p style={{ display: "flex", justifyContent: "center" }}>Prices</p>
            <div
              className="mb-4"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <label className="block text-black-900 text-center">
                  Normal_Suite
                </label>
                <input
                  type="text"
                  name="normal_suite"
                  placeholder="normal_Price"
                  value={formData.price.normal_suite}
                  onChange={handlePriceChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  style={{ width: "280px" }}
                />
              </div>
              <div>
                <label className="block text-black-900 text-center">
                  Vip_Suite
                </label>
                <input
                  type="text"
                  name="vip_suite"
                  placeholder="Vip_Price"
                  value={formData.price.vip_suite}
                  onChange={handlePriceChange}
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
              <label className="block text-black-900 text-center">
                Ratings
              </label>
              <textarea
                name="ratings"
                placeholder="Ratings"
                value={formData.ratings}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mt-4 mb-4">
              <label className="block text-black-900">Hotel Image</label>
              <input
                type="text"
                name="image"
                placeholder="Image_Url"
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                required
                style={{ border: "1 px solid black" }}
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

export default CreateHotel;
