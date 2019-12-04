import React, {useEffect, useState, useRef} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";

import ThemeButton from "./components/themeButton/themeButton";
import About from "./components/about/about";
import Home from "./components/home/home";
import Skills from "./components/skills/skills";
import Works from "./components/works/works";
import Contact from "./components/contact/contact";
import Particles from "./components/particlesJS/particlesJS";

import NavBar from "./components/navbarAndLoader/navbar";

import './components/viewComponents.scss';
import './components/navbarAndLoader/navbarAndLoader.scss';

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

const isDark = () => {
	return (localStorage.getItem('color') === 'dark')
};

// toggle local storage value 'color' when necessary
const toggleLocalStorage = () => {
	if (localStorage.getItem('color') === null) {
		localStorage.setItem('color', 'dark');
	} else {
		localStorage.removeItem('color');
	}
};

const App = ({location: {pathname}}) => {
	// Refs
	const vc = useRef(''), navTopIcons = useRef(''),
		navBotIcons = useRef(''), navTopRef = useRef(''),
		navBotRef = useRef(''), leftLine = useRef(''),
		rightLine = useRef(''), bottomLine = useRef(''),
		aboutRef = useRef(''), lineRef = useRef(''),
		workRef = useRef('');

	// Component States
	const [initBackgroundActiveClass, setBackgroundActiveClass] = useState(''),
		[initLightModeClass, setLightModeClass] = useState('');

	// --- Device Motion State Variables ---
	let [lastX, setlastX] = useState(), [lastY, setlastY] = useState(), [lastZ, setlastZ] = useState();

	const updateView = () => {
		let viewChildrenActive = vc.current.childNodes;
		for (let n = 0; n < viewChildrenActive.length; n++) {
			viewChildrenActive[n].classList.add('active');
			viewChildrenActive[n].classList.add('active-f');
			/*if (localStorage.getItem('color') === 'dark')
				viewChildrenActive[n].classList.add('dark');*/
		}
	};
	const updateViewWhenUnmounting = (viewChildren) => {
		for (let n = 0; n < viewChildren.childNodes.length; n++) {
			viewChildren.childNodes[n].classList.remove('active');
		}
	};

	// Notification settings
	const createNotification = message => {
		let notification = document.getElementById('notification');

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

	useEffect(() => {
		let navTopRefs = navTopRef.current;
		let navBotRefs = navBotRef.current;
		let iconListTop = Array.from(navTopIcons.current.childNodes);
		let iconListBot = Array.from(navBotIcons.current.childNodes);
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
					alert("SHAKE!!!");
					moveCounter = 0;
				}
			}
		};
		let viewRemChildrenActive = vc.current;
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
				} else {
					navTopRef.current.classList.remove('flat');
					navBotRef.current.classList.remove('flat');
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
			// todo get back here
			setTimeout(() => {
				setLightModeClass('active');
				if (pathname === '/' && isMobile()) {
					// createNotification('Shake device to toggle night mode.')
				}
			}, 2500);

			adjustNavBars();
			window.addEventListener('resize', adjustNavBars);
		});

		return () => {
			updateViewWhenUnmounting(viewRemChildrenActive);
			window.removeEventListener("devicemotion", motion, false);
			window.removeEventListener('resize', adjustContentSliders);
			window.removeEventListener('resize', adjustNavBars);
			navTopRefs.classList.remove('active');
			navBotRefs.classList.remove('active');
			setLightModeClass('');
			setBackgroundActiveClass('active transition');
		}
	}, [pathname, lastX, lastY, lastZ]);

	return (
		<>
			<div className='site-loader active'>
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
				<ThemeButton classProps={initLightModeClass}/>
				<div className='view-container' ref={vc}>
					<Switch>
						<Route exact path='/' render={props => <Home {...props} />}/>
						<Route path='/about' render={props => <About {...props} lineRef={lineRef} aboutRef={aboutRef}/>}/>
						<Route path='/skills' render={props => <Skills {...props} lineRef={lineRef}/>}/>
						<Route path='/works' render={props => <Works {...props} workRef={workRef}/>}/>
						<Route path='/contact' render={props => <Contact {...props} />}/>
					</Switch>
				</div>
				<Particles classProps={initBackgroundActiveClass}/>
			</div>
		</>
	)
};

export default withRouter(App);
