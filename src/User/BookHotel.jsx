import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Unavbar from "./Unavbar";
import "./bookhotel.css";

function BookHotel() {
  const [item, setItem] = useState({});
  const [selectedSuite, setSelectedSuite] = useState("normal_suite");
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
      .get(`http://localhost:7000/hotel/${id}`)
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

  const handleChangeDarshan = (e) => {
    setSelectedSuite(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Item:", item);
      // Ensure item is available and contains the required properties
      if (
        !item ||
        !item.name ||
        !item.price ||
        !item.description ||
        !item.address ||
        !item.image
      ) {
        throw new Error("Item data is missing required properties");
      }

      const { description, price, name, address, image } = item;

      const totalAmount =
        parseInt((price?.[selectedSuite] || 0) * quantity, 10) + 45;

      // const quantity=quantity;
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
      alert("booked successfully");
      navigate("/plans");
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "" }}>
      <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>
      <div style={{ display: "flex " }}>
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
          <h2 className="text-2xl font-semibold">
            Your Booking is almost Done!{" "}
          </h2>
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
            <div>
              <label>Select Room</label>
              <div className="select-container">
                {" "}
                {/* New div for styling */}
                <select value={selectedSuite} onChange={handleChangeDarshan}>
                  <option value="normal_suite">Normal Suite</option>
                  <option value="vip_suite">Vip Suite</option>
                </select>
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
              Two Members can stay in one Room
            </p>
            <div>
              <p htmlFor="checkIn" className="text-center">
                Check-In Date:
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "100%",
                  width: "100%",
                }}
              >
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "17px" }}>Check-In Time:</p>
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
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "17px" }}>Rooms:</p>
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
                <p style={{ fontSize: "17px" }}>Price:</p>
                <p> ₹ {quantity * (item.price?.[selectedSuite] || 0)}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "17px" }}>Convience Fee:</p>
                <p>₹ 45</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "17px" }}>Total Amount:</p>
                <p>
                  {" "}
                  ₹{" "}
                  {parseInt(quantity * (item.price?.[selectedSuite] || 0)) +
                    45}
                </p>
              </div>
            </div>
            <button
              type="submit"
              style={{ width: "340px" }}
              className="bg-blue-400 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookHotel;
