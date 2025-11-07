import React from 'react'
import ReactPlayer from 'react-player';
import '../User/user.css'
import video from '../assets/video2.mp4'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {

    const navigate =useNavigate();

  return (
    <div>

<div className="video-container">
  
<div>
<NavBar/>
</div>
     <h1  className='text-center text-gray-100' style={{paddingTop:"120px"}}><strong>Welcome to Trip_Planner</strong></h1>
     <h2 className='text-center text-gray-400' style={{paddingTop:"20px"}}><strong>Unlock Your Travel Dreams</strong></h2>
       <h2  className='text-center text-gray-400'><strong>With Us!</strong></h2>
<p className='text-center text-white'>Discover the world's most adventures nature, life is too short</p>
<div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
<Button style={{backgroundColor:"orangered",borderRadius:"25px",height:"50px"}} onClick={()=>navigate('/ulogin')}>Explore Now →</Button>
</div>
      <ReactPlayer
        url={video}
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="react-player"
      />
    </div>
    
    
    
    </div>
  )
}

export default Home