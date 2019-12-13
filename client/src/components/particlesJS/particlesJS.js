import React from 'react';
import Particles from "react-particles-js";

const ParticlesJS = ({classProps}) => {
	const styles = {
		fontFamily: "sans-serif",
		textAlign: "center",
	};

	const particlesParam = {
		particles: {
			color: {
				value: "#a29bfe"
			},
			"number": {
				"value": 300,
				"density": {
					"enable": false
				}
			},
			"size": {
				"value": 10,
				"random": true
			},
			"move": {
				"direction": "random",
				"out_mode": "out"
			},
			"line_linked": {
				"enable": false
			}
		},
		"interactivity": {
			"events": {
				"onclick": {
					"enable": true,
					"mode": "remove"
				}
			},
			"modes": {
				"remove": {
					"particles_nb": 10
				}
			}
		}
	};

	return (
		<div style={styles} className={`background ${classProps}`}>
			<Particles params={particlesParam}/>
		</div>
	)
};

export default ParticlesJS;