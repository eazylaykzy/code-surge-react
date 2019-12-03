import React, {Fragment, useEffect} from 'react';

import {ReactComponent as Logo} from "../../assets/images/codeSurge.svg";
import '../viewComponents.scss';

const Home = () => {
	useEffect(() => {
		return () => {
			console.log('Home Component will unmount');
		}
	}, []);

	return (
		<Fragment>
			<div className='view home'>
				<div className='home header-container'>
					<div className='header-title-wrap'>
						<div className='cover'/>
						<h1 className='header big first'>Code</h1>
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
			<div className='logo-big'>
				<Logo/>
			</div>
		</Fragment>
	)
};

export default Home;