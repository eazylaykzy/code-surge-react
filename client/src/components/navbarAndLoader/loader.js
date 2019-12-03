import React, {useState, useEffect} from 'react';

import './navbarAndLoader.scss';

const Loader = (props) => {
	console.log(props.children);
	const [initDivStyle, setDivStyle] = useState('');
	const [initLoaderClass, setLoaderClass] = useState('');
	const [initYAxisClass, setYAxisClass] = useState('');
	const [initChangeAxisClass, setChangeAxisClass] = useState('');
	const [initXAxisClass, setXAxisClass] = useState('');

	const loaderTime = () => {
		setTimeout(() => {
			setLoaderClass('site-loader active');
		}, 500);
		setTimeout(() => {
			setYAxisClass('line move-y');
		}, 1000);
		setTimeout(() => {
			setChangeAxisClass('change-axis');
		}, 2000);
		setTimeout(() => {
			setXAxisClass('move-x');
		}, 3000);
		setTimeout(() => {
			setDivStyle('hidden');
		}, 3500);
	};

	useEffect(() => {
		console.log('useEffect in loader');
		loaderTime();
	}, []);

	return (
		<div style={{visibility: `${initDivStyle}`}} className={initLoaderClass}>
			<span className={`left move-y-flat ${initYAxisClass} ${initChangeAxisClass} ${initXAxisClass}`}/>
			<span className={`right move-y-flat ${initYAxisClass} ${initChangeAxisClass} ${initXAxisClass}`}/>
			<span className="line bottom"/>
		</div>
	)
};

export default Loader;