import React, {useState, useEffect, useRef, useMemo} from 'react';

import {totalSkills} from './skillsData';

function shuffle(array) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}

function useActiveSkills(skills) {
	return useMemo(() => shuffle(skills), [skills]);
}

const Skills = () => {
	let skillWrap = useRef();
	console.log(skillWrap);

	let [activeSkills, setActiveSkills] = useState([]);
	console.log(activeSkills);

	let sMax = totalSkills.length - 1; // 0 -> 19

	let activeStart = Math.floor(Math.random() * (sMax + 1));
	let activeEnd = (activeStart === 0) ? sMax : activeStart - 1;

	for (let e = activeStart; e <= sMax; e++) {
		activeSkills.push(totalSkills[e]);
	}

	if (activeStart !== 0) {
		for (let s = 0; s <= activeEnd; s++) {
			activeSkills.push(totalSkills[s]);
		}
		setActiveSkills([]);
	}

	let scrollDis = 0,
		scrollingDown = false,
		scrollingUp = false,
		scrollingDownSelf = false,
		scrollingUpSelf = false,
		scrollCatchInterval = 40,
		scrollDirection = 'up',
		hasScrolledRecently = false;

	const wheelEventHandler = e => {
		let skillFocused = skillWrap.current.childNodes[19];

		skillFocused.classList.remove('active');

		function animateScroll(scrollDis, callback) {
			let curLeftTop = scrollDis * 8,
				curLeftFinal = scrollDis * 4;
			tween(skillWrap.current, -curLeftFinal, curLeftTop, 1, callback);
		}

		function scrollUp() {
			setTimeout(() => {
				for (let su = 0; su < scrollDis; su++) {

					activeEnd--;
					activeStart--;
					if (activeEnd < 0) activeEnd = 19;
					if (activeStart < 0) activeStart = 19;
					activeSkills.unshift(totalSkills[activeStart]);
					activeSkills.pop();

				}
				skillFocused.classList.add('active');
				skillWrap.current.style.transform = 'none';
				scrollDis = 0;
				scrollingUp = false;
				scrollingUpSelf = false;
				if (e.deltaZ === 0) {
					setTimeout(() => {
						hasScrolledRecently = false;
					}, 3000);
				}
			}, 0)
		}

		function scrollDown() {
			setTimeout(() => {
				for (let sd = 0; sd < Math.abs(scrollDis); sd++) {
					activeEnd++;
					activeStart++;
					if (activeEnd > 19) activeEnd = 0;
					if (activeStart > 19) activeStart = 0;
					activeSkills.push(totalSkills[activeEnd]);
					activeSkills.shift();
				}
				skillFocused.classList.add('active');
				skillWrap.style.transform = 'none';
				scrollDis = 0;
				scrollingDown = false;
				scrollingDownSelf = false;
				if (e.deltaZ === 0) {
					setTimeout(() => {
						hasScrolledRecently = false;
					}, 3000);
				}
			}, 0)
		}

		if ((e.deltaY === 100 || e.deltaY === 3) && !scrollingUp && !scrollingDownSelf) {
			// (scroll down) add skill to bottom & remove skill from top
			scrollDirection = 'down';
			scrollDis--;
			scrollingDown = true;
			if (e.deltaZ === 0) hasScrolledRecently = true;
			let scd = scrollDis;
			setTimeout(() => {
				if (scrollDis === scd) {
					if (scrollDis < -6) scrollDis = -6;
					scrollingDownSelf = true;
					animateScroll(scrollDis, scrollDown);
				}
			}, scrollCatchInterval)
		} else if ((e.deltaY === -100 || e.deltaY === -3) && !scrollingDown && !scrollingUpSelf) {
			// (scroll up) add skill to top & remove skill from bottom
			scrollDirection = 'up';
			scrollDis++;
			scrollingUp = true;
			if (e.deltaZ === 0) hasScrolledRecently = true;
			let scu = scrollDis;
			setTimeout(() => {
				if (scrollDis === scu) {
					if (scrollDis > 5) scrollDis = 5;
					scrollingUpSelf = true;
					animateScroll(scrollDis, scrollUp);
				}
			}, scrollCatchInterval)
		}
	};

	function tween(o, x, y, durationSecs, onComplete) {
		let fps = 30, count = 0, stopAt = fps * durationSecs, easef = Quad_easeInOut;
		let f = function () {
			count++;
			if (count >= stopAt) {
				tween_stop(o);
				if (onComplete) onComplete();
			} else {
				tween_setProperty(o, easef(count, 0, x, stopAt), easef(count, 0, y, stopAt));
			}
		};
		clearInterval(o._tween_int);
		o._tween_int = setInterval(f, durationSecs * 1000 / fps);
	}

	function tween_stop(o) {
		clearInterval(o._tween_int);
	}

	function tween_setProperty(o, x, y) {
		o.style.cssText += ';transform:translate3d(' + x + 'vw,' + y + 'vh,0);';
	}

	function Quad_easeInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}

	useEffect(() => {

		setTimeout(() => {
			skillWrap.current.childNodes[19].classList.add('active');
		}, 2000);

		window.addEventListener('wheel', wheelEventHandler);

		function constantScroll() {
			// prevents scrolling while changing views
			setTimeout(function () {
				// emulate scrolling of the skill list
				let scrollEvent = new WheelEvent('wheel', {
					'deltaY': (scrollDirection === 'up') ? -100 : 100,
					'deltaZ': 1 // used to differentiate between user scroll / programmatic scroll
				});

				if (!hasScrolledRecently) {
					// 3 scroll events are dispatched to mirror scrolling of 3 skills
					for (let r = 0; r < 3; r++) {
						window.dispatchEvent(scrollEvent);
					}
				}
				constantScroll();
			}, 3000)
		}

		// wait 3 seconds before issuing first scroll
		setTimeout(function () {
			constantScroll();
		}, 2000);

		return () => {
			window.removeEventListener('wheel', wheelEventHandler);
			console.log('Skills Component will unmount');
		}
	}, [activeSkills, hasScrolledRecently, scrollDirection]);

	return (
		<div>
			<div className='view skills active active-f'>
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
				<div className='skill-container active active-f'>
					<div className='skill-wrap'>
						hey
					</div>
				</div>
			</div>
			<div className='skill-container active-f active'>
				<div ref={skillWrap} className='skill-wrap'>
					{console.log(activeSkills)}
					{console.log(typeof activeSkills)}
					{activeSkills.map((skill, i) => <div key={i} className='skill'>{skill}</div>)}
				</div>
			</div>
		</div>
	)
};

export default Skills;