import React from 'react';
import Unavbar from './Unavbar';
import Footer from '../Components/Footer';

const About = () => {
  return (
    <div>
        <div style={{ backgroundColor: "skyblue" }}>
        <Unavbar />
      </div>
      <br/>
        <div className="about-container" style={styles.container}>
      <h2 style={styles.heading}>About Our Trip Planner</h2>
      <p style={styles.paragraph}>
        Welcome to our Trip Planner – your ultimate companion for creating unforgettable travel experiences! Whether you're a seasoned explorer or a first-time adventurer, our platform is designed to make trip planning a joy.
      </p>
      <p style={styles.paragraph}>
        At Trip Explorer, we believe in turning travel dreams into reality. Our user-friendly interface allows you to effortlessly plan your itinerary, discover exciting destinations, and create memories that last a lifetime.
      </p>
      <h3 style={styles.subHeading}>Key Features:</h3>
      <ul style={styles.list}>
        <li>🗺️ Intuitive Trip Planning: Easily create and customize your travel itinerary.</li>
        <li>🌍 Destination Discovery: Explore new and exciting places with our curated recommendations.</li>
        <li>🤝 Collaborative Planning: Plan with friends or family members in real-time.</li>
        <li>☁️ Weather Updates: Stay informed with real-time weather forecasts for your destinations.</li>
      </ul>
      <h3 style={styles.subHeading}>Meet the Team:</h3>
      <p style={styles.paragraph}>
        Our passionate team of travel enthusiasts is dedicated to simplifying the journey for every traveler. Meet the faces behind Trip Explorer:
      </p>
      <ul style={styles.list}>
        <li>👤 Syed Arshad - Founder & CEO</li>
        <li>💻 Syed Arshad - Lead Developer</li>
        <li>🎨 Syed Arshad - UX/UI Designer</li>
      </ul>
      <p style={styles.paragraph}>
        We hope you enjoy using our Trip Planner and that it adds an extra layer of excitement to your travel experiences. Happy exploring!
      </p>
    </div>
    <br/>
<Footer/>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: '26px',
    marginBottom: '16px',
    color: '#555',
  },
  paragraph: {
    marginBottom: '16px',
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '16px',
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  },
};

export default About;
