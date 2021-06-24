import React from 'react';
import classes from './Thumbnails.module.css';
import { FaEdit, FaTrashAlt,FaRegStar } from 'react-icons/fa';
import { useGlobalContext } from '../context';

export default function Thumbnails({ items }) {
	const { updateInfo, deleteItems } = useGlobalContext();

	return (
		<div className={classes.thumbnails}>
			<div className={classes.thumbnailsImg}>
				<img
					src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixi
    d=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
					alt="person"
				/>
			</div>
			<div className={classes.thumbnailsDesc}>
				<p>{items.task_msg}</p>
				<p className={classes.date}>{items.task_date}</p>
			</div>
			<div className={classes.thumbnailsAction}>
				<button className={classes.btn} onClick={() => updateInfo(items.id)}>
					<FaEdit />
				</button>
				<button className={classes.btn} onClick={() => deleteItems(items.id)}>
					<FaTrashAlt />
				</button>
				<button className={classes.btn}>
					<FaRegStar />
				</button>
			</div>
		</div>
	);
}
