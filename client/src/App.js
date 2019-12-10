import React, {useEffect, useState, useRef} from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import axios from 'axios';

import About from "./components/about/about";
import Home from "./components/home/home";
import Skills from "./components/skills/skills";
import Works from "./components/works/works";
import Contact from "./components/contact/contact";
import Particles from "./components/particlesJS/particlesJS";

import NavBar from "./components/navbarAndLoader/navbar";

import './components/viewComponents.scss';
import './components/navbarAndLoader/navbarAndLoader.scss';
import {ReactComponent as Sun} from "./assets/images/sun.svg";
import {ReactComponent as Moon} from "./assets/images/moon.svg";

const mobileWidth = 1024;

// is user on a mobile?
const isMobile = () => {
	return window.innerWidth <= mobileWidth;
};

// is user on a portrait mode?
const isPortrait = () => {
	return document.body.clientWidth < document.body.clientHeight;
};

// is user on a tablet?
const isTablet = () => {
	return ((window.innerWidth <= 1024 || window.innerHeight < 768) && !(isPortrait()));
};

// toggle local storage value 'mode' when necessary
const toggleLocalStorage = () => {
	if (localStorage.getItem('mode') === null) {
		localStorage.setItem('mode', 'light');
	} else {
		localStorage.removeItem('mode');
	}
};
/*const isLight = () => {
	return (localStorage.getItem('mode') === 'light')
};*/

const App = ({location: {pathname}}) => {
	// Refs
	const vc = useRef(''), navTopIcons = useRef(''),
		navBotIcons = useRef(''), navTopRef = useRef(''),
		navBotRef = useRef(''), leftLine = useRef(''),
		rightLine = useRef(''), bottomLine = useRef(''),
		aboutRef = useRef(''), lineRef = useRef(''),
		workRef = useRef(''), notificationRef = useRef(''),
		nameRef = useRef(''), emailRef = useRef(''),
		messageRef = useRef(''), loaderRef = useRef(''),
		themeButton = useRef('');

	// Component States
	const [initBackgroundActiveClass, setBackgroundActiveClass] = useState(''),
		[initClearForm, setClearForm] = useState(false),
		[isLight, setIsLight] = useState(localStorage.getItem('mode') === 'light');

	// --- Device Motion State Variables ---
	let [lastX, setlastX] = useState(), [lastY, setlastY] = useState(), [lastZ, setlastZ] = useState();

	const updateView = () => {
		let viewChildrenActive = vc.current.childNodes;
		for (let n = 0; n < viewChildrenActive.length; n++) {
			viewChildrenActive[n].classList.add('active');
			viewChildrenActive[n].classList.add('active-f');
			if (localStorage.getItem('mode') === 'light') viewChildrenActive[n].classList.remove('dark');
		}
	};
	const updateViewWhenUnmounting = (viewChildren) => {
		for (let n = 0; n < viewChildren.childNodes.length; n++) {
			viewChildren.childNodes[n].classList.remove('active');
		}
	};

	// toggle viewChildren class 'dark'
	const toggleViewChildren = () => {
		if (isLight) {
			setTimeout(() => {
				let viewChildrenToggleActive = vc.current.childNodes;
				vc.current.parentNode.parentNode.parentNode.style.backgroundColor = '#ecf0f1';
				navTopRef.current.classList.remove('dark');
				navBotRef.current.classList.remove('dark');
				loaderRef.current.classList.remove('dark');
				notificationRef.current.classList.remove('dark');
				for (let n = 0; n < viewChildrenToggleActive.length; n++) {
					viewChildrenToggleActive[n].classList.remove('dark');
				}
			}, 0)
		} else {
			setTimeout(() => {
				let viewChildrenToggleActive = vc.current.childNodes;
				vc.current.parentNode.parentNode.parentNode.style.backgroundColor = 'rgb(52, 17, 77)';
				navTopRef.current.classList.add('dark');
				navBotRef.current.classList.add('dark');
				loaderRef.current.classList.add('dark');
				notificationRef.current.classList.add('dark');
				for (let n = 0; n < viewChildrenToggleActive.length; n++) {
					viewChildrenToggleActive[n].classList.add('dark');
				}
			}, 0)
		}
	};
	toggleViewChildren();

	// Notification settings
	const createNotification = message => {
		let notification = notificationRef.current;

		notification.innerHTML = message;
		let notificationWidth = parseFloat(window.getComputedStyle(notification, null).getPropertyValue('width'));
		notification.style.left = '-' + notificationWidth + 'px';
		notification.style.transform = 'translateX(' + (notificationWidth + 20) + 'px)';
		notification.classList.add('active');

		setTimeout(() => {
			notification.style.transform = 'none';
			notification.classList.remove('active');
		}, 5000);
	};

	//mode, moon and sun change handler
	const sunMoonClickHandler = () => {
		toggleLocalStorage();
		setIsLight(localStorage.getItem('mode') === 'light');
	};

	// Form submit handler
	const handleFormSubmit = e => {
		const name = nameRef.current.value, email = emailRef.current.value,
			message = messageRef.current.value;
		e.preventDefault();
		axios({
			method: "POST",
			url: `https://codesurge.herokuapp.com:3002/contact`,
			data: {
				name,
				email,
				message,
			}
		}).then((response) => {
			if (response.data.msg === 'success') {
				createNotification('Message received, thank you.');
				setClearForm(true);
				setTimeout(() => {setClearForm(false)})
			} else if (response.data.msg === 'fail') {
				createNotification(`Hmm... Something went wrong!`);
			}
		})
	};

	useEffect(() => {
		let themeButtonEffect = themeButton.current.classList;
		let navTopRefs = navTopRef.current;
		let navBotRefs = navBotRef.current;
		let iconListTop = Array.from(navTopIcons.current.childNodes);
		let iconListBot = Array.from(navBotIcons.current.childNodes);
		// viewRemChildrenActive remove active class from the view upon unmounting
		let viewRemChildrenActive = vc.current;

		// Toggle Light Mode on Device Shake
		let moveCounter = 0;
		const motion = e => {
			let acc = e.acceleration;
			if (!acc.hasOwnProperty("x")) {
				acc = e.accelerationIncludingGravity;
			}

			if (!acc.x) return;

			//only log if x,y,z > 1
			if (
				Math.abs(acc.x) >= 1 &&
				Math.abs(acc.y) >= 1 &&
				Math.abs(acc.z) >= 1
			) {
				//console.log('motion', acc);
				if (!lastX) {
					setlastX(acc.x);
					setlastY(acc.y);
					setlastZ(acc.z);
					return;
				}

				let deltaX = Math.abs(acc.x - lastX);
				let deltaY = Math.abs(acc.y - lastY);
				let deltaZ = Math.abs(acc.z - lastZ);

				if (deltaX + deltaY + deltaZ > 15) {
					moveCounter++;
				} else {
					moveCounter = Math.max(0, --moveCounter);
				}

				if (moveCounter > 20) {
					sunMoonClickHandler();
					localStorage.getItem('mode') === 'light' ?
						createNotification('Light mode on.') : createNotification('Dark mode on.');
					moveCounter = 0;
				}
			}
		};
		window.addEventListener("devicemotion", motion, false);

		for (let i = 0; i < iconListBot.length; i++) {
			iconListBot[i].classList.remove('active')
		}

		// set active nav icon
		switch (pathname) {
			case '/about':
				iconListBot[1].classList.add('active');
				break;
			case '/skills':
				iconListBot[2].classList.add('active');
				break;
			case '/works':
				iconListBot[3].classList.add('active');
				break;
			case '/contact':
				iconListBot[4].classList.add('active');
				break;
			default:
				iconListBot[0].classList.add('active');
		}

		// work & about overflow styling
		if (pathname === '/works' || pathname === '/about') {
			let container = workRef.current || aboutRef.current,
				wrapper = container.parentNode;

			container.addEventListener('scroll', () => {
				if (isMobile() || isTablet()) {
					if (container.scrollTop !== 0) {
						if (container.scrollHeight - container.offsetHeight === container.scrollTop) {
							wrapper.classList.add('fade-top');
						} else {
							wrapper.classList.add('fade-top-bottom');
							wrapper.classList.remove('fade-top');
						}
					} else wrapper.classList.remove('fade-top', 'fade-top-bottom');
				}
			});
		}

		const adjustContentSliders = () => {
			if (pathname === '/about' || pathname === '/skills') {
				let bodies = lineRef.current.childNodes;
				for (let b = 0; b < bodies.length; b++) {
					let bodyHeight = parseInt(window.getComputedStyle(bodies[b], null).getPropertyValue('height'));
					bodies[b].style.height = bodyHeight - bodyHeight * .05 + 'px';
				}
			}
		};

		adjustContentSliders();
		window.addEventListener('resize', adjustContentSliders);

		// Mobile Style Handlers
		const adjustNavBars = () => {
			setTimeout(function () {
				if ((isMobile() && isPortrait()) || (!isTablet() && pathname === '/contact')) {
					navTopRef.current.classList.add('flat');
					navBotRef.current.classList.add('flat');
					themeButtonEffect.add('contact');
				} else {
					navTopRef.current.classList.remove('flat');
					navBotRef.current.classList.remove('flat');
					themeButtonEffect.remove('contact');
				}
			}, 300)
		};

		setTimeout(() => {
			navTopRefs.classList.remove('flat');
			navBotRefs.classList.remove('flat');
			navTopRefs.style.opacity = '0';
			navBotRefs.style.opacity = '0';
		}, 300);

		setTimeout(() => {
			if (pathname === '/contact' || (isMobile() && isPortrait())) {
				leftLine.current.style.visibility = 'visible';
				rightLine.current.style.visibility = 'visible';
				leftLine.current.classList.add('move-y-flat');
				rightLine.current.classList.add('move-y-flat');
			} else if (isTablet()) {
				bottomLine.current.style.visibility = 'visible';
				bottomLine.current.classList.add('move-y');
			} else {
				leftLine.current.style.visibility = 'visible';
				rightLine.current.style.visibility = 'visible';
				leftLine.current.classList.add('move-y');
				rightLine.current.classList.add('move-y');

				setTimeout(() => {
					leftLine.current.classList.add('change-axis');
					rightLine.current.classList.add('change-axis');
				}, 810);

				setTimeout(function () {
					leftLine.current.classList.add('move-x');
					rightLine.current.classList.add('move-x');
				}, 1100);
			}

			setTimeout(function () {
				setBackgroundActiveClass('active');
				navTopRefs.classList.add('transition', 'active');
				navBotRefs.classList.add('transition', 'active');
				navTopRefs.style.opacity = '1';
				navBotRefs.style.opacity = '1';
				leftLine.current.style.display = 'none';
				rightLine.current.style.display = 'none';
				bottomLine.current.style.display = 'none';
			}, 1600);

			// random icon reveal animation handler
			setTimeout(function () {

				function showRandomIcon(iconList) {
					setTimeout(function () {
						let index = Math.floor(Math.random() * (iconList.length - 1));
						iconList[index].style.opacity = 1;
						iconList.splice(index, 1);
						if (iconList.length > 0) showRandomIcon(iconList);
					}, 80);
				}

				showRandomIcon(iconListTop);
				showRandomIcon(iconListBot);
			}, 1600);

			// update global view instance
			setTimeout(function () {
				updateView();
			}, 1800);

			// change nav icon transition value after initial animation
			// total time for all icons to be revealed : timeout delay * icons.length = 720ms
			// delay from reveal set at : 1600ms + 720ms = 2320ms
			setTimeout(function () {
				let navTopIconsNew = navTopIcons.current.childNodes;
				let navBotIconsNew = navBotIcons.current.childNodes;
				for (let a = 0; a < navTopIconsNew.length; a++) {
					navTopIconsNew[a].classList.add('transition');
				}
				for (let b = 0; b < navBotIconsNew.length; b++) {
					navBotIconsNew[b].classList.add('transition');
				}
			}, 2320);

			// display mobile shake light mode reminder if being viewed from a phone
			// display light mode toggle button
			setTimeout(() => {
				themeButtonEffect.add('active');
				if (pathname === '/' && isMobile()) {
					createNotification('Shake device to toggle night mode.')
				}
			}, 2500);
			setIsLight(localStorage.getItem('mode') === 'light');

			adjustNavBars();
			window.addEventListener('resize', adjustNavBars);
		});

		return () => {
			updateViewWhenUnmounting(viewRemChildrenActive); // this is not working just yet.
			window.removeEventListener("devicemotion", motion, false);
			window.removeEventListener('resize', adjustContentSliders);
			window.removeEventListener('resize', adjustNavBars);
			navTopRefs.classList.remove('active');
			navBotRefs.classList.remove('active');
			themeButtonEffect.remove('active');
			setBackgroundActiveClass('active transition');
			setIsLight(localStorage.getItem('mode') === 'light');
		}
	}, [pathname, lastX, lastY, lastZ]);

	return (
		<>
			<div className='site-loader dark active' ref={loaderRef}>
				<span ref={leftLine} className={`line left`}/>
				<span ref={rightLine} className={`line right`}/>
				<span ref={bottomLine} className={`line bottom`}/>
			</div>
			<div className='site-wrap'>
				<NavBar
					navTopRef={navTopRef}
					navBotRef={navBotRef}
					navTopIcons={navTopIcons}
					navBotIcons={navBotIcons}
				/>
				<div
					ref={themeButton} onClick={() => sunMoonClickHandler()}
					className={`light-mode`}>
					{isLight ? <Moon className='moon'/> : <Sun className='sun'/>}
				</div>
				<div className='dark notification' ref={notificationRef}/>
				<div className='view-container' ref={vc}>
					<Switch>
						<Route exact path='/' render={props => <Home {...props} />}/>
						<Route path='/about' render={props => <About {...props} lineRef={lineRef} aboutRef={aboutRef}/>}/>
						<Route path='/skills' render={props => <Skills {...props} lineRef={lineRef}/>}/>
						<Route path='/works' render={props => <Works {...props} workRef={workRef}/>}/>
						<Route path='/contact' render={props => <Contact {...props}
						                                                 isLight={isLight}
						                                                 nameRef={nameRef} emailRef={emailRef}
						                                                 messageRef={messageRef} handleSubmit={handleFormSubmit}
						                                                 clearForm={initClearForm}
						/>}/>
						<Redirect to="/" />
					</Switch>
				</div>
				<Particles classProps={initBackgroundActiveClass}/>
			</div>
		</>
	)
};

export default withRouter(App);
