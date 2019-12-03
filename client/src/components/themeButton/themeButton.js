import React, {useEffect, useState} from 'react';

import {ReactComponent as Sun} from "../../assets/images/sun.svg";
import {ReactComponent as Moon} from "../../assets/images/moon.svg";

import '../viewComponents.scss';

const ThemeButton = ({classProps}) => {
	const [initMode, toggleMode] = useState(true);

	useEffect(() => {
		toggleMode(initMode)
	}, [initMode]);

	return (
		<div onClick={() => toggleMode(!initMode)} className={`light-mode ${classProps}`}>
			{
				initMode ? <Sun className='sun'/>
				: <Moon className='moon'/>
			}
		</div>
	)
};

export default ThemeButton;