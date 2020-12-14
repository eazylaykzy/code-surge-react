import React, {useEffect, useRef} from 'react';
import $ from "jquery";

import '../viewComponents.scss';
import {totalSkills} from './skillsData';

const Skills = ({lineRef}) => {
	let skillWrap = useRef();

	useEffect(() => {
		let activeClassTime = null;
		let scrollAnimInterval = setInterval(function () {
			skillWrap.current.childNodes[8].classList.add('active');
			activeClassTime = setTimeout(() => {
				skillWrap.current.childNodes[8].classList.remove('active');
			}, 2000);
			$('#list').stop().animate({scrollTop: 40}, 2650, 'linear', function () {
				$(this).scrollTop(0).find('div:last').after($('div:first', this));
			});
		}, 2700);

		return () => {
			clearTimeout(activeClassTime);
			clearInterval(scrollAnimInterval);
		}
	}, []);

	return (
		<>
			<div className='view skills dark'>
				<div className='header-container skills'>
					<div className='header-title-wrap'>
						<div className='cover'/>
						<h1 className='header big first'>My</h1>
						<h1 className='header big last'>Skillsset</h1>
					</div>
					<div ref={lineRef} className='header-info-wrap'>
						<div className="header-content-body skill-one">
							<div className="line-left"/>
							<p className="header body about-one">
								The main area of my expertise is backend and frontend development and
								everything related to this side of the web. HTML, CSS, JS (ES5, ES6),
								building production ready small to medium Web Apps with <strong>React.JS</strong>, <strong>Next.JS</strong>,
								<strong> Node.JS</strong>, <strong>Go(Golang)</strong>, lately, I have been building mobile applications with
								<strong> React Native</strong> for iOS and Android OSes, I really love building features rich content,
								animations, and just coding layouts.
							</p>
						</div>
						<div className="header-content-body gap skill-two">
							<div className="line-left"/>
							<p className="header body about-two gap">
								As of late, I've also been dabbling in some newer technologies like <strong>Blockchain</strong>,
								<strong> Microservices</strong> and <strong>Machine Learning</strong>. More than anything, I am always
								eager to learn and adapt to the ever-changing facets of the web. <br/>
								I'm a <strong> Top Rated 🌟 </strong> Freelancer on <strong> Upwork </strong>, you can follow this link: <br/>
								<a style={{color: '#57a3e4'}} href="https://www.upwork.com/fl/adelekeadenijio"> Adeleke Adeniji Upwork Profile</a>
								to view more of my projects not published here on my portfolio.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='skill-container'>
				<div ref={skillWrap} id="list" className='skill-wrap'>
					{totalSkills.map((skill, i) => <div key={i} className='skill'>{skill}</div>)}
				</div>
			</div>
		</>
	)
};

export default Skills;