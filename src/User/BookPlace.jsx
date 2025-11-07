import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Unavbar from "./Unavbar";
import "./bookhotel.css";

function BookPlace() {
  const [item, setItem] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phno: "",
    checkIn: "",
    reservationTime: "",
  });

  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7000/place/${id}`)
      .then((resp) => {
        console.log("API Response:", resp.data);
        setItem(resp.data);
      })
      .catch((error) => {
        console.log("Failed to fetch item data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Item:", item);
      // Ensure item is available and contains the required properties
      if (
        !item ||
        !item.name ||
        !item.description ||
        !item.address ||
        !item.image
      ) {
        throw new Error("Item data is missing required properties");
      }

      const { description, name, address, image } = item;

      const totalAmount = item.price ? item.price * quantity : 0;

      const quantityValue = quantity;

      // Add the item properties to the formData
      const updatedFormData = {
        ...formData,
        rooms: quantityValue,
        totalamount: totalAmount,
        description: description,
        hotelName: name,
        address: address,
        image: image,
      };

      // You can add user-specific data here
      const userid = JSON.parse(localStorage.getItem("user")).id;
      const username = JSON.parse(localStorage.getItem("user")).name;
      updatedFormData.userId = userid;
      updatedFormData.userName = username;

      // Post the updatedFormData
      await axios.post("http://localhost:7000/userplan", updatedFormData);
      console.log(updatedFormData);
      alert("Plan submitted successfully");
      navigate("/plans");
    } catch (error) {
      console.error("Error planning:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "" }}>
      <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>
      <div style={{ display: "flex " }}>
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
          <h2 className="text-2xl font-semibold">Your Plan is almost Done! </h2>
          {/* <p>item name:{item.itemtype}</p> */}
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-600 text-center"
                style={{ paddingTop: "10px" }}
              >
                Details:
              </label>
              <div class="input-container">
                <input
                  type="text"
                  id="myInput"
                  class="w-48 p-2 border border-gray-300 rounded focus:outline-none"
                  placeholder=" "
                  style={{ width: "340px" }}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label
                  for="myInput"
                  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform"
                >
                  name
                </label>
              </div>
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div class="input-container">
                  <input
                    type="text"
                    id="myInput"
                    class="w-48 p-2 border border-gray-300 rounded focus:outline-none"
                    placeholder=" "
                    style={{ width: "160px" }}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label
                    for="myInput"
                    class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform"
                  >
                    Email
                  </label>
                </div>
              </div>
              <div>
                <div class="input-container">
                  <input
                    type="text"
                    id="myInput"
                    class="w-48 p-2 border border-gray-300 rounded focus:outline-none"
                    placeholder=" "
                    style={{ width: "160px" }}
                    name="phno"
                    value={formData.phno}
                    onChange={handleChange}
                  />
                  <label
                    for="myInput"
                    class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform"
                  >
                    phno:-
                  </label>
                </div>
              </div>
            </div>
            <br />
            <p
              style={{
                backgroundColor: "cyan",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Plan a visit for your group
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "17px" }}>Visitors:</p>
              <div>
                <button
                  onClick={decrease}
                  type="button"
                  style={{
                    backgroundColor: "wheat",
                    width: "20px",
                    marginRight: "7px",
                  }}
                >
                  -
                </button>
                {quantity}
                <button
                  onClick={increase}
                  type="button"
                  style={{
                    backgroundColor: "wheat",
                    width: "20px",
                    marginLeft: "7px",
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "17px" }}>Visit Date:</p>
              <div class="input-container">
                <input
                  type="date"
                  id="checkIn"
                  class="w-48 p-2 border border-gray-300 rounded focus:outline-none"
                  style={{ width: "160px" }}
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "17px" }}>Visit Time:</p>
              <div class="input-container">
                <input
                  type="time"
                  id="reservationTime"
                  class="w-48 p-2 border border-gray-300 rounded focus:outline-none"
                  style={{ width: "160px" }}
                  name="reservationTime"
                  value={formData.reservationTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "17px" }}>Price per Visitor:</p>
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                ₹ {item.price || 0}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "17px" }}>Total Amount:</p>
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                ₹ {item.price ? item.price * quantity : 0}
              </p>
            </div>
            <button
              type="submit"
              style={{ width: "340px" }}
              className="bg-blue-400 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookPlace;
