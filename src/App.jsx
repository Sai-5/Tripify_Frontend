import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Uhome from "./User/Uhome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Destinations from "./User/Destinations";
import Gallery from "./User/Testimonials";
import BookHotel from "./User/BookHotel";
import BookRestaurant from "./User/BookRestaurant";
import BookPlace from "./User/BookPlace";
import Plan from "./User/Plan";
import Plans from "./User/Plans";
import MyTrips from "./User/MyTrips";
import Testimonials from "./User/Testimonials";
import About from "./User/About";
import Home from "./Components/Home";
import Ulogin from "./User/Ulogin";
import Usignup from "./User/Usignup";
import Alogin from "./Admin/Alogin";
import Asignup from "./Admin/Asignup";
import MyBookings from "./User/MyBookings";
import Ahome from "./Admin/Ahome";
import Users from "./Admin/Users";
import Hotels from "./Admin/Hotels";
import Restaurants from "./Admin/Restaurants";
import Places from "./Admin/Places";
import CreateHotel from "./Admin/CreateHotel";
import CreateRestaurant from "./Admin/CreateRestaurant";
import CreatePlace from "./Admin/CreatePlace";
import AllBookings from "./Admin/AllBookings";
import AllTrips from "./Admin/AllTrips";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Home */}

          <Route path="/" element={<Home />} />
          <Route path="/ulogin" element={<Ulogin />} />
          <Route path="/usignup" element={<Usignup />} />

          {/* Admin */}
          <Route path="/alogin" element={<Alogin />} />
          <Route path="/asignup" element={<Asignup />} />
          <Route
            path="/ahome"
            element={
              <ProtectedRoute requiredRole="admin">
                <Ahome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createhotel"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels"
            element={
              <ProtectedRoute requiredRole="admin">
                <Hotels />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatehotel/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createrestaurant"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateRestaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurants"
            element={
              <ProtectedRoute requiredRole="admin">
                <Restaurants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updaterestaurant/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateRestaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createplace"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreatePlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/places"
            element={
              <ProtectedRoute requiredRole="admin">
                <Places />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateplace/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreatePlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allbookings"
            element={
              <ProtectedRoute requiredRole="admin">
                <AllBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alltrips"
            element={
              <ProtectedRoute requiredRole="admin">
                <AllTrips />
              </ProtectedRoute>
            }
          />

          {/* User */}
          <Route
            path="/uhome"
            element={
              <ProtectedRoute requiredRole="user">
                <Uhome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/destinations"
            element={
              <ProtectedRoute requiredRole="user">
                <Destinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookhotel/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <BookHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookrestaurant/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <BookRestaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookplace/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <BookPlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/testimonials"
            element={
              <ProtectedRoute requiredRole="user">
                <Testimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mybookings"
            element={
              <ProtectedRoute requiredRole="user">
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute requiredRole="user">
                <Plan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <ProtectedRoute requiredRole="user">
                <Plans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mytrips"
            element={
              <ProtectedRoute requiredRole="user">
                <MyTrips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute requiredRole="user">
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
