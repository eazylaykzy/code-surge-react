import React, {useEffect, useRef} from 'react';
import $ from "jquery";

import '../viewComponents.scss';
import {totalSkills} from './skillsData';

const Skills = () => {
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
			<div className='view skills'>
				<div className='header-container skills'>
					<div className='header-title-wrap'>
						<div className='cover'/>
						<h1 className='header big first'>My</h1>
						<h1 className='header big last'>Skillsset</h1>
					</div>
					<div className='header-info-wrap'>
						<div className="header-content-body skill-one">
							<div className="line-left"/>
							<p className="header body about-one">
								The core of my skill set largely surrounds the MERN <strong>stack</strong>, to achieve both a clear and
								dynamic user experience. I also have some experience with mobile integration (Android and iOS).
								Strengthening my grasp of the mobile app development space is one of my primary goals for the near
								future.
							</p>
						</div>
					</div>
				</div>
				<div className='skill-container'>
					<div className='skill-wrap'>
						hey
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