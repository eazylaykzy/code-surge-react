import React from 'react';

import {ReactComponent as Logo} from "../../assets/images/codeSurge.svg";
import '../viewComponents.scss';

const Home = () => {
  const iOSMotionRequest = async () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        console.log(response);
      } catch (err) {
        alert(err)
      }
    } else {
      // non iOS 13+
    }
  }

  return (
    <>
      <div className='view home dark'>
        <div className='home header-container'>
          <div className='header-title-wrap'>
            <div className='cover'/>
            <h1 onClick={iOSMotionRequest} className='header big first'>Code</h1>
            <h1 className='header big last'>Surge</h1>
          </div>
          <div className='header-info-wrap'>
            <div className='cover'/>
            <h2 className='header info'>
              Full Stack Developer
              <strong> / </strong>
              Node
              <strong> / </strong>
              Go
              <strong> / </strong>
              React
            </h2>
          </div>
        </div>
      </div>
      <div className='logo-big dark'>
        <Logo/>
      </div>
    </>
  )
};

export default Home;