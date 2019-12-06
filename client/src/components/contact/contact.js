import React, {useState, useEffect} from 'react';

import GoogleMap from './googleMap';

import '../button/button.scss';
import './contact-form.scss';
import '../viewComponents.scss';

const Contact = ({nameRef, emailRef, subjectRef, messageRef, handleSubmit, clearForm}) => {
	const [initName, setName] = useState(''), [initEmail, setEmail] = useState(''),
		[initSubject, setSubject] = useState(''), [initMessage, setMessage] = useState(''),
		[initButton, setButton] = useState('disabled'), [initMailVal, setMailVal] = useState('');

	const emailValidator = emailInput => {
		let regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
		if (clearForm) {
			setName('');
			setEmail('');
			setSubject('');
			setMessage('');
		}

		if ((initName && initSubject && initMessage && emailValidator(initEmail)) !== '') {
			setButton('');
		} else setButton('disabled');
	}, [initName, initSubject, initEmail, initMessage, clearForm]);

	return (
		<>
			<div className='view contact dark'>
				<div className='header-container contact'>
					<div className='header-title-wrap'>
						<div className='cover'/>
						<h1 className='header big first'>Get</h1>
						<h1 className='header big middle'>In</h1>
						<h1 className='header big last'>Touch</h1>
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
									name="name" type="text" className="form__input" id="name" placeholder="Name"
									required/>
								<label htmlFor="name" className="form__label">Name</label>
							</div>
							<div className="form__group form__group--cus">
								<input
									onKeyUp={() => emailValidator(initEmail)}
									ref={emailRef}
									value={initEmail}
									onChange={event => setEmail(event.target.value)}
									name="email" type="email" id="email" className={`form__input ${initMailVal}`}
									placeholder="Email" required/>
								<label htmlFor="email" className="form__label">Email</label>
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
							<button className={`btn btn--ghost-submit ${initButton}`} type="submit">Send</button>
						</form>
					</div>
				</div>
			</div>
			<div className='map-wrapper dark'>
				<div className='map'><GoogleMap/></div>
			</div>
		</>
	)
};

export default Contact;