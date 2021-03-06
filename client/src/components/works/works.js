import React from 'react';

import {Button} from "../button/button";

import Omnifood from "../../assets/work-images/OmniFood.png";
import EazyCommerce from "../../assets/work-images/EazyCommerce.png";
import ChatApp from "../../assets/work-images/ChatApp.png";
import '../viewComponents.scss';

const Works = ({workRef}) => {
	return (
		<div className='work-wrapper dark'>
			<div className='work-container' ref={workRef}>
				<div className='work-list'>
					<figure className='work-panel timer'>
						<div className='work-panel-slider'/>
						<div className='work-panel-cover'/>
						<div className='work-panel-mask'/>
						<img src={Omnifood} alt=""/>
						<figcaption>
							<h1>Omnifood is a food delivery website application template, for ordering food based on location.</h1>
							<Button classProps={`btn btn--ghost-small`} url={`https://omnifoods.herokuapp.com/`} target={`_blank`}>Visit
								Website</Button>
						</figcaption>
					</figure>
					<figure className='work-panel timer'>
						<div className='work-panel-slider'/>
						<div className='work-panel-cover'/>
						<div className='work-panel-mask'/>
						<img src={EazyCommerce} alt=""/>
						<figcaption>
							<h1>EazyCommerce is an e-commerce app built on top of the React JS, it uses stripe for payment processing.</h1>
							<Button classProps={`btn btn--ghost-small`} url={`https://eazy-commerce.herokuapp.com/`}
							        target={`_blank`}>Visit Website</Button>
						</figcaption>
					</figure>
					<figure className='work-panel timer'>
						<div className='work-panel-slider'/>
						<div className='work-panel-cover'/>
						<div className='work-panel-mask'/>
						<img src={ChatApp} alt=""/>
						<figcaption>
							<h1>This is a simple Node.JS chat app, hosted on Heroku, I developed it using Socket.io, Express.JS, Pug,
								Mustache.</h1>
							<Button classProps={`btn btn--ghost-small`} url={`https://arcane-dusk-68316.herokuapp.com/`} target={`_blank`}>Visit
								Website</Button>
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	)
};

export default Works;