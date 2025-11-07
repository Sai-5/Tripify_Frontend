import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';


import QRCode from "react-qr-code";
import Footer from '../Components/Footer';


function MyBookings() {
  const [cars, setCars] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:7000/getbookings/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setCars(taskData);
          console.log(taskData)
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  }, []);

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? 'upcomming' : 'completed';
  };


  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <div style={{backgroundColor:"skyblue"}}>
      <Unavbar/>
      </div>
      <div style={{flex:"1"}}>
        <h1 className='text-center'>My Bookings</h1>
        <div>
          {cars.map((item) => {
            const status = calculateStatus(item.checkIn);

            return (
              <Card
                key={item._id}
                style={{
                  width: '90%',
                  marginLeft: '65px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  paddingTop: '15px',
                  marginBottom: '35px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-around',}}>
                  <div>
                    <img src={item.image} alt={`${item.itemtype} Image`} style={{ height: '90px',marginBottom:"15px" }} />
                  </div>
                  <div >
    <QRCode
    size={86}
    value={item._id.slice(0, 10)}
    viewBox={`0 0 256 256`}
    />
</div>
                  <div>
                    <p>Hotel Name:</p>
                    <p>{item.hotelName}</p>
                  </div>
                  <div>
                    <p>BookingId:</p>
                    <p>{item._id.slice(0, 8)}</p>
                  </div>
                 
                  <div>
                    <p>Address:</p>
                    {item.address.slice(0,22)}
                    <br/>
                    {item.address.slice(22,42)}
                    <br/>
                    {item.address.slice(42,62)}
                    <br/>
                    {item.address.slice(62)}
                  </div>
                  <div>
                    <p>Rooms:</p>
                    {item.rooms}
                  </div>
                  <div>
                    <p>BookingDate</p>
                    <p>{item.BookingDate}</p>
                  </div>
                  <div>
                    <p>Check-In Date</p>
                    <p>{item.checkIn}</p>
                  </div>
                  <div>
                    <p>Price</p>
                    <p>₹{item.totalamount}</p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p>{status}</p>
                  </div>
                </div>

    

             
              </Card>
            );
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyBookings;
