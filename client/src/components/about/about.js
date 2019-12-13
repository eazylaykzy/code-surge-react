import React from 'react';

const About = ({lineRef, aboutRef}) => (
	<>
		<div className='view about dark'>
			<div ref={aboutRef} className='header-container about'>
				<div className='header-title-wrap'>
					<div className='cover'/>
					<h1 className='header big first'>About</h1>
					<h1 className='header big last'>Me</h1>
				</div>
				<div ref={lineRef} className='header-info-wrap'>
					<div className="header-content-body about-one">
						<div className="line-left"/>
						<p className="header body about-one">Hi, I'm Adeleke, a<strong> Full-Stack Web Developer</strong>.
							I use an artistic approach to solve problems <strong>Efficiently</strong>, Professionally connected
							with the web development industry and information technology for quite some years.
							Effectiveness in the industry<strong> today</strong> requires an acute parity
							between<strong> development</strong>
							and<strong> artistic tastes</strong>.</p></div>
					<div className="header-content-body gap about-two">
						<div className="line-left"/>
						<p className="header body gap about-two">I'm Interested in the
							entire <strong>Frontend</strong> and <strong>Backend </strong>
							spectrum and working on ambitious projects with positive people. I admire simple content structure, clean
							design models, and
							<strong> responsive</strong> interactions. I enjoy coding from scratch and enjoy bringing concepts and
							designs to life in the
							<strong> browser</strong>.</p></div>
					<div className="header-content-body gap about-three">
						<div className="line-left"/>
						<p className="header body gap about-three">My passion for <strong>programming</strong> started around late
							2011, while I was
							playing with Adobe Dreamweaver, but then it got boring, as I wanted to know the basics of programming
							comprehensively. Shortly after I found love with <strong>Java</strong>, and then, the web came back to me
							from the simplicity
							of this language, since I've familiarised myself with the stacks of the <strong>internet</strong>, I had
							no reason to look back,
							it's been fun till now.</p>
					</div>
					<div className="header-content-body gap about-four">
						<div className="line-left"/>
						<p className="header body gap about-three">A well-organized person, problem solver, independent employee
							with close attention
							to detail. Fan of <strong>Footbal</strong> ⚽, outdoor activities, TV series, comics, animations, and, recently, the UFC 😍.
							I	genuinely <strong>care</strong> about people and love supporting fellow designers' work on their craft.</p></div>
				</div>
			</div>
		</div>
	</>
);

export default About;