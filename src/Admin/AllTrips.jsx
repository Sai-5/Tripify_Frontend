import React, { useEffect, useState } from "react";
import axios from "axios";
import Anavbar from "./Anavbar";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:7000/alltrips");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const deleteTrip = async (tripId) => {
    try {
      await axios.delete(`http://localhost:7000/deletetrip/${tripId}`);
      setTrips(trips.filter((trip) => trip._id !== tripId));
      alert("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const totalAmount = trips.reduce(
    (sum, trip) =>
      sum +
      trip.plans.reduce(
        (planSum, plan) => planSum + parseInt(plan.totalamount),
        0
      ),
    0
  );

  return (
    <div>
      <Anavbar />
      <div className="container mt-4">
        <h2>All Trips</h2>
        <div className="row">
          {trips.map((trip) => (
            <div key={trip._id} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Trip by {trip.plans[0]?.name || "Unknown"}
                  </h5>
                  <p className="card-text">User ID: {trip.userId}</p>
                  <p className="card-text">
                    Created At: {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    Total Price: ₹
                    {trip.plans.reduce(
                      (sum, plan) => sum + parseInt(plan.totalamount),
                      0
                    )}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTrip(trip._id)}
                  >
                    Delete Trip
                  </button>
                  <h6>Plans:</h6>
                  <p>Number of Plans: {trip.plans.length}</p>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Booking Date</th>
                          <th>Members</th>
                          <th>Total Amount</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Check In</th>
                          <th>Reservation Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trip.plans.map((plan, index) => (
                          <tr key={index}>
                            <td>
                              {plan.hotelName.replace("Hotel", "").trim()}
                            </td>
                            <td>{plan.address}</td>
                            <td>{plan.BookingDate}</td>
                            <td>{plan.rooms}</td>
                            <td>{plan.totalamount}</td>
                            <td>{plan.name}</td>
                            <td>{plan.email}</td>
                            <td>{plan.phno}</td>
                            <td>{plan.checkIn}</td>
                            <td>{plan.reservationTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p>Total Amount of All Trips: ₹{totalAmount}</p>
      </div>
    </div>
  );
};

export default AllTrips;
