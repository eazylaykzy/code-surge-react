import React, {useEffect, useState, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";

import {ReactComponent as TwitterIcon} from '../../assets/images/twitter.svg';
import {ReactComponent as Linkedln} from '../../assets/images/linkedin.svg';
import {ReactComponent as Github} from '../../assets/images/github.svg';
import {ReactComponent as Codepen} from '../../assets/images/codepen.svg';
import {ReactComponent as Home} from '../../assets/images/home.svg';
import {ReactComponent as About} from '../../assets/images/contact.svg';
import {ReactComponent as Skills} from '../../assets/images/code_icon.svg';
import {ReactComponent as Works} from '../../assets/images/work.svg';
import {ReactComponent as Contact} from '../../assets/images/mail.svg';
import './navbarAndLoader.scss';

const NavBar = ({location:{pathname}}) => {
	const [initTopNavClass, setTopNavClass] = useState('hidden');
	const [initBotNavClass, setBotNavClass] = useState('hidden');

	useEffect(() => {
		console.log(pathname);
		setTimeout(() => {
			setTopNavClass('nav-top transition active');
			setBotNavClass('nav-bottom transition active');
		}, 3600);
		return () => {
			setTopNavClass('nav-top transition');
			setBotNavClass('nav-bottom transition');
		}
	}, [pathname]);

	return (
		<Fragment>
			<nav className={`flat ${initTopNavClass}`}>
				<div className='nav-wrapper top'>
					<a target="_blank" className='nav-icon twitter transition' href='https://www.twitter.com'
					   rel="noopener noreferrer">
						<TwitterIcon/>
					</a>
					<a target="_blank" className='nav-icon linkedln transition' href='https://www.linkedln.com'
					   rel="noopener noreferrer">
						<Linkedln/>
					</a>
					<a target="_blank" className='nav-icon github transition' href='https://www.github.com'
					   rel="noopener noreferrer">
						<Github/>
					</a>
					<a target="_blank" className='nav-icon codepen transition' href='https://www.codepen.com'
					   rel="noopener noreferrer">
						<Codepen/>
					</a>
				</div>
			</nav>
			<nav className={`flat ${initBotNavClass}`} onKeyUp={document.activeElement.blur()}>
				<div className='nav-wrapper bot'>
					<Link className='nav-icon home active' to='/'>
						<div className='hover-text'>Home</div>
						<Home/>
					</Link>
					<Link className='nav-icon about' to='/about'>
						<div className='hover-text'>About</div>
						<About/>
					</Link>
					<Link className='nav-icon skills' to='/skills'>
						<div className='hover-text'>Skills</div>
						<Skills/>
					</Link>
					<Link className='nav-icon work' to='/works'>
						<div className='hover-text'>Works</div>
						<Works/>
					</Link>
					<Link className='nav-icon contact' to='contact'>
						<div className='hover-text'>Contact</div>
						<Contact/>
					</Link>
				</div>
			</nav>
		</Fragment>
	)
};

export default withRouter(NavBar);