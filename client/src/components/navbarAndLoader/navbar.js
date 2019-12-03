import React from 'react';
import {Link} from "react-router-dom";

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

const NavBar = ({navTopClass, navBotClass, navTopIcons, navBotIcons}) => {
	return (
		<>
			<nav className={`nav-top ${navTopClass}`}>
				<div className='nav-wrapper top' ref={navTopIcons}>
					<a target="_blank" className='nav-icon twitter' href='https://www.twitter.com'
					   rel="noopener noreferrer">
						<TwitterIcon/>
					</a>
					<a target="_blank" className='nav-icon linkedln' href='https://www.linkedln.com'
					   rel="noopener noreferrer">
						<Linkedln/>
					</a>
					<a target="_blank" className='nav-icon github' href='https://www.github.com'
					   rel="noopener noreferrer">
						<Github/>
					</a>
					<a target="_blank" className='nav-icon codepen' href='https://www.codepen.com'
					   rel="noopener noreferrer">
						<Codepen/>
					</a>
				</div>
			</nav>
			<nav className={`nav-bottom ${navBotClass}`} onKeyUp={document.activeElement.blur()}>
				<div className='nav-wrapper bot' ref={navBotIcons}>
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
		</>
	)
};

export default NavBar;