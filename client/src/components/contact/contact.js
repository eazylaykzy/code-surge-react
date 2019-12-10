import React, {useState, useEffect} from 'react';

import GoogleMap from './googleMap';

import '../button/button.scss';
import './contact-form.scss';
import '../viewComponents.scss';

const Contact = ({nameRef, emailRef, messageRef, handleSubmit, clearForm, isLight}) => {
	const [initName, setName] = useState(''), [initEmail, setEmail] = useState(''),
		[initMessage, setMessage] = useState(''), [initButton, setButton] = useState('disabled'),
		[initMailValidator, setMailValidator] = useState('');

	const emailValidator = emailInput => {
		let regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (regx.test(emailInput)) {
			setMailValidator('');
			return true;
		} else {
			setMailValidator('val_error');
			return false;
		}
	};

	useEffect(() => {
		if (clearForm) {
			setName('');
			setEmail('');
			setMessage('');
		}

		if ((initName && initMessage && emailValidator(initEmail)) !== '') {
			setButton('');
		} else setButton('disabled');
	}, [initName, initEmail, initMessage, clearForm]);

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
									name="name" type="text" className="form__input" placeholder="Name"
									required/>
								<label htmlFor="name" className="form__label">Name</label>
							</div>
							<div className="form__group form__group--cus">
								<input
									onKeyUp={() => emailValidator(initEmail)}
									ref={emailRef}
									value={initEmail}
									onChange={event => setEmail(event.target.value)}
									name="email" type="email" className={`form__input ${initMailValidator}`}
									placeholder="Email" required/>
								<label htmlFor="email" className="form__label">Email</label>
							</div>
							<div className="form__group">
								<textarea
									ref={messageRef}
									value={initMessage}
									onChange={event => setMessage(event.target.value)}
									name="message"
									className="form__input"
									placeholder="Your Message" required/>
								<label htmlFor="message" className="form__label">Your Message</label>
							</div>
							<button className={`btn btn--ghost-submit ${initButton}`} type='submit'>Send</button>
						</form>
					</div>
				</div>
			</div>
			<div className='map-wrapper dark'>
				<div className='map'><GoogleMap isLight={isLight}/></div>
			</div>
		</>
	)
};

export default Contact;