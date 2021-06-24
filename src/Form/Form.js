import React from 'react';
import classes from './Form.module.css';
import { useGlobalContext } from '../context';

export default function Form() {
	const {
		team,
		hideForm,
		addTasks,
		initialState,
		itemInfo,
		updateItemInfo,
		update,
		setUpdate,
		itemId,
		updateTasks
	} = useGlobalContext();
	// const [itemInfo, updateItemInfo] = useState(initialState);

	function updateForm(e) {
		const value = e.target.value;
		updateItemInfo({
			...itemInfo,
			[e.target.name]: value
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		addTasks(itemInfo);
		hideForm();
	}

	function abortForm(e) {
		e.preventDefault();
		updateItemInfo(initialState);
		hideForm();
		setUpdate(false);
	}

	function updateFields(e) {
		e.preventDefault();
		updateTasks(itemId, itemInfo);
		hideForm();
	}

	return (
		<form onSubmit={update ? updateFields : handleSubmit}>
			<div className={classes.item}>
				<p>Task Description</p>
				<input
					type="text"
					name="task"
					value={itemInfo.task}
					onChange={updateForm}
				/>
			</div>
			<div className={classes.itemGroup}>
				<div className={classes.item}>
					<p>Date</p>
					<input
						type="date"
						name="date"
						value={itemInfo.date}
						onChange={updateForm}
						required
					/>
				</div>
				<div className={classes.item}>
					<p>Time</p>
					<input
						type="time"
						name="time"
						value={itemInfo.time}
						onChange={updateForm}
						required
						placeholder="time"
					/>
				</div>
			</div>
			<div className={classes.item}>
				<select name="person" value={itemInfo.person} onChange={updateForm}>
					{team &&
						team.map((name, index) => (
							<option
								key={index}
								value={name.user_status === 'accepted' && name.name}>
								{name.user_status === 'accepted' && name.name}
							</option>
						))}
				</select>
			</div>

			<div className={classes.btnContainer}>
				<button className={classes.btnCancel} onClick={abortForm}>
					Cancel
				</button>
				{update ? (
					<button className={classes.btnSubmit}>Update</button>
				) : (
					<button className={classes.btnSubmit}>Submit</button>
				)}
			</div>
		</form>
	);
}
