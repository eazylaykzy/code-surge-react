import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';

import GoogleMap from './googleMap';

import '../button/button.scss';
import './contact-form.scss';
import '../viewComponents.scss';

const Contact = () => {
	const nameRef = useRef('');
	const emailRef = useRef('');
	const subjectRef = useRef('');
	const messageRef = useRef('');

	const [initName, setName] = useState('');
	const [initEmail, setEmail] = useState('');
	const [initSubject, setSubject] = useState('');
	const [initMessage, setMessage] = useState('');
	const [initButton, setButton] = useState('disabled');
	const [initMailVal, setMailVal] = useState('');

	const name = nameRef.current.value;
	const email = emailRef.current.value;
	const subject = subjectRef.current.value;
	const message = messageRef.current.value;

	const emailValidator = emailInput => {
		let regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log(`Email validator returns: ${regx.test(emailInput)}`);
		if (regx.test(emailInput)) {
			setMailVal('');
			return true;
		}
		else {
			setMailVal('val_error');
			return false;
		}
	};

	useEffect(() => {
		if ((initName && initSubject && initMessage && emailValidator(initEmail)) !== '') {
			setButton('');
		}
	}, [initName, initSubject, initEmail, initMessage]);

	const handleSubmit = e => {
		e.preventDefault();
		axios({
			method: "POST",
			url:"http://localhost:3002/send",
			data: {
				name,
				email,
				subject,
				message,
			}
		}).then((response)=>{
			if (response.data.msg === 'success'){
				alert("Message Sent.");
				resetForm()
			}else if(response.data.msg === 'fail'){
				alert("Message failed to send.")
			}
		})
	};
	const resetForm = () => {
		setName('');
		setEmail('');
		setSubject('');
		setMessage('');
	};
	return (
		<>
			<div className='view contact'>
				<div className='header-container contact'>
					<div className='header-title-wrap'>
						<div className='cover'/>
						<h1 className='header big first'>Let</h1>
						<h1 className='header big middle'>'s</h1>
						<h1 className='header big last'>Connect</h1>
					</div>
					<div className='header-info-wrap'>
						<div className='cover'/>
						<h1 className='header info'>I’m excited to learn about your project.</h1>
					</div>
					<div className='contact-form'>
						<form className='form' onSubmit={handleSubmit} method="POST">
							<div className="form__group form__group--cus">
								<input
									ref={nameRef}
									value={initName}
									onChange={event => setName(event.target.value)}
									name="name" type="text" className="form__input" id="name" placeholder="Full Name"
									required/>
								<label htmlFor="name" className="form__label">Full Name</label>
							</div>
							<div className="form__group form__group--cus">
								<input
									onKeyUp={() => emailValidator(initEmail)}
									ref={emailRef}
									value={initEmail}
									onChange={event => setEmail(event.target.value)}
									name="email" type="email" id="email" className={`form__input ${initMailVal}`}
									placeholder="Email Address" required/>
								<label htmlFor="email" className="form__label">Email Address</label>
							</div>
							<div className="form__group">
								<input
									ref={subjectRef}
									value={initSubject}
									onChange={event => setSubject(event.target.value)}
									name="subject" type="text" className="form__input" id="subject"
									placeholder="Subject" required/>
								<label htmlFor="subject" className="form__label">Subject</label>
							</div>
							<div className="form__group">
						<textarea
							ref={messageRef}
							value={initMessage}
							onChange={event => setMessage(event.target.value)}
							name="message"
							className="form__input" id="message"
							placeholder="Your Message" required/>
								<label htmlFor="message" className="form__label">Your Message</label>
							</div>
							<button className={`btn btn--ghost-small ${initButton}`} type="submit">Send</button>
						</form>
					</div>
				</div>
			</div>
			<div className='map-wrapper active-f active'>
				<div id='map'><GoogleMap/></div>
			</div>
		</>
	)
};

export default Contact;