import React from 'react';
import classes from './Tasks.module.css';
import { useGlobalContext } from '../context';

export default function Task({ totalTasks }) {
	const { toggleForm, displayForm } = useGlobalContext();
	console.log(toggleForm);
	return (
		<div className={classes.head}>
			<h4>
				<span className={classes.text}>TASKS </span>
				<span className={classes.value}>{totalTasks}</span>
			</h4>
			<button className={classes.btnAdd} onClick={displayForm}>
				+
			</button>
		</div>
	);
}
