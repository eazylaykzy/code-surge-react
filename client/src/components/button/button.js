import React from 'react';

import './button.scss';

export const Button = props => (
	<div>
		<a target={props.target} className={props.classProps} href={props.url}>{props.children}</a>
	</div>
);