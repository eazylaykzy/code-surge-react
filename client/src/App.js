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

const App = ({location: {pathname}}) => {
	// Refs
	const vc = useRef('');
	const navTopIcons = useRef('');
	const navBotIcons = useRef('');
	const leftLine = useRef('');
	const rightLine = useRef('');
	const bottomLine = useRef('');

	// Component States
	const [initBackgroundActiveClass, setBackgroundActiveClass] = useState('');
	const [initLightModeClass, setLightModeClass] = useState('');
	const [initNavTopClass, setNavTopClass] = useState('');
	const [initNavBotClass, setNavBotClass] = useState('');
	// --- Device Motion State ---
	let [lastX, setlastX] = useState();
	let [lastY, setlastY] = useState();
	let [lastZ, setlastZ] = useState();

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

	useEffect(() => {
// Toggle Light Mode on Device Shake
		let moveCounter = 0;
		function motion(e) {
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
		}
		let viewRemChildrenActive = vc.current;
		window.addEventListener("devicemotion", motion, false);
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
				setNavTopClass('transition active');
				setNavBotClass('transition active');
				leftLine.current.style.display = 'none';
				rightLine.current.style.display = 'none';
				bottomLine.current.style.display = 'none';
			}, 1600);

			// random icon reveal animation handler
			let iconListTop = Array.from(navTopIcons.current.childNodes);
			let iconListBot = Array.from(navBotIcons.current.childNodes);
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
		});

		return () => {
			updateViewWhenUnmounting(viewRemChildrenActive);
			window.removeEventListener("devicemotion", motion, false);
			setLightModeClass('');
			setNavTopClass('transition');
			setNavBotClass('transition');
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
					navTopClass={initNavTopClass}
					navBotClass={initNavBotClass}
					navTopIcons={navTopIcons}
					navBotIcons={navBotIcons}
				/>
				<ThemeButton classProps={initLightModeClass}/>
				<div className='view-container' ref={vc}>
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/about' component={About}/>
						<Route path='/skills' component={Skills}/>
						<Route path='/works' component={Works}/>
						<Route path='/contact' component={Contact}/>
					</Switch>
				</div>
				<Particles classProps={initBackgroundActiveClass}/>
			</div>
		</>
	)
};

export default withRouter(App);
