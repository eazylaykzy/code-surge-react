import React, {useEffect} from 'react';

const About = ({lineRef, aboutRef}) => {

	useEffect(() => {
		return () => {
			console.log('About Component will unmount');
		}
	}, []);

	return (
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
							<p className="header body about-one">Hi, I'm Sam, a 19-year-old<strong> Full-Stack Web Developer</strong>.
								As a developer, and even in my day-to-day life, I strive for efficiency. But, in the reality of
								today's online world, being fast and responsive just doesn't cut it.
								Being effective<strong> today</strong> requires a keen balance between<strong> optimization</strong>
								and<strong> aesthetics</strong>.</p></div>
						<div className="header-content-body gap about-two">
							<div className="line-left"/>
							<p className="header body gap about-two">My love for programming started around late<strong> 2011</strong>,
								shortly after<strong> Minecraft</strong> had seen its official release. I started tinkering with the
								game
								purely out of curiosity, and to my surprise, I really enjoyed the challenge and creative process
								that came along with<strong> Java</strong> development. Over the years, I went onto work with some
								wonderful people, who would go onto become amazing friends and mentors.</p></div>
						<div className="header-content-body gap about-three">
							<div className="line-left"/>
							<p className="header body gap about-three">As time progressed, and the Minecraft community moved on, I
								began looking for another platform to mirror my creative desires. I had messed around with
								some web-based ideas before, but I had never fully immersed myself into the space - and man am I glad
								that I did.</p>
						</div>
						<div className="header-content-body gap about-four">
							<div className="line-left"/>
							<p className="header body gap about-four">The switch to web was daunting at first, but as I stuck with it,
								my love for the space grew - and I know now that it is where I belong. Other than programming, over
								the years, I've also come to love<strong> cooking</strong>,<strong> fitness</strong>, and<strong>
									fashion</strong>.</p></div>
					</div>
				</div>
			</div>
		</>
	)
};

export default About;