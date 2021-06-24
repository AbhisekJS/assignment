import React, { useContext, useEffect, useState } from 'react';
import timeString  from './utils/Util';
const AppContext = React.createContext();

let initialState = {
	task: '',
	date: '',
	time: '00:00',
	person: ''
};

const AppProvider = ({ children }) => {
	const [itemInfo, updateItemInfo] = useState(initialState);
	const [itemId, setItemId] = useState(null);

	const [team, setTeam] = useState([]);
	const [allItems, setAllItems] = useState([]);
	const [tasks, setTasks] = useState(allItems);
	const [toggleForm, setToggleForm] = useState(false);
	const [update, setUpdate] = useState(false);

	// ToggleForms
	const displayForm = () => {
		setToggleForm(true);
	};
	const hideForm = () => {
		setToggleForm(false);
	};
	const updateInfo = (id) => {
		displayForm();
		setUpdate(true);
		setItemId(id);
	};

	// get All Teams
	async function getTeam() {
		try {
			const res = await fetch('https://stage.api.sloovi.com/team', {
				method: 'GET',
				headers: {
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzNzcxOTUsIm5iZiI6MTYyNDM3NzE5NSwianRpIjoiMjMzNDQ4MTMtODhmYy00MzVjLTlmNWUtYjUxODlkNzk0NGU3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.i8LrhurveBPeDALf5kGBGMSq0aJ_dMIjGvTp_XfYfvw`,
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			const resData = await res.json();
			setTeam(resData.results.data);
		} catch (err) {
			console.log(err);
		}
	}
	// Adding Task

	async function addTasks(info) {
		const body = {
			assigned_user: 'user_6beec459915f4507a8d2520e60e03c3e',
			task_date: info.date,
			task_time: timeString(info.time),
			is_completed: 0,
			time_zone: timeString('05:30'),
			task_msg: info.task
		};
		console.log(body);
		try {
			const res = await fetch(
				'https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzNzcxOTUsIm5iZiI6MTYyNDM3NzE5NSwianRpIjoiMjMzNDQ4MTMtODhmYy00MzVjLTlmNWUtYjUxODlkNzk0NGU3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.i8LrhurveBPeDALf5kGBGMSq0aJ_dMIjGvTp_XfYfvw`,
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				}
			);
			const resData = await res.json();
			console.log('posted Successfully', resData);
			setTasks([...tasks, body]);
		} catch (err) {
			throw new Error(err);
		}
	}

	// getAllItems
	async function getAllItems() {
		try {
			const res = await fetch(
				'https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzNzcxOTUsIm5iZiI6MTYyNDM3NzE5NSwianRpIjoiMjMzNDQ4MTMtODhmYy00MzVjLTlmNWUtYjUxODlkNzk0NGU3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.i8LrhurveBPeDALf5kGBGMSq0aJ_dMIjGvTp_XfYfvw`,
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				}
			);
			const resData = await res.json();
			console.log('allitems', resData.results);
			setAllItems(resData.results);
			setTasks(allItems);
		} catch (err) {
			console.log(err);
		}
	}

	// DeleteITems
	async function deleteItems(id) {
		await fetch(
			`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzNzcxOTUsIm5iZiI6MTYyNDM3NzE5NSwianRpIjoiMjMzNDQ4MTMtODhmYy00MzVjLTlmNWUtYjUxODlkNzk0NGU3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.i8LrhurveBPeDALf5kGBGMSq0aJ_dMIjGvTp_XfYfvw`,
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		console.log('Items Deleted');
	}

	// Update Task
	async function updateTasks(id, info) {
		const body = {
			assigned_user: 'user_6beec459915f4507a8d2520e60e03c3e',
			task_date: info.date,
			task_time: timeString(info.time),
			is_completed: 0,
			time_zone: timeString('05:30'),
			task_msg: info.task
		};

		try {
			const res = await fetch(
				`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQzNzcxOTUsIm5iZiI6MTYyNDM3NzE5NSwianRpIjoiMjMzNDQ4MTMtODhmYy00MzVjLTlmNWUtYjUxODlkNzk0NGU3IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.i8LrhurveBPeDALf5kGBGMSq0aJ_dMIjGvTp_XfYfvw`,
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				}
			);
			const resData = await res.json();
			console.log('posted Successfully', resData);
		} catch (err) {
			throw new Error(err);
		}
	}

	useEffect(() => {
		getTeam();
		getAllItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AppContext.Provider
			value={{
				initialState,
				toggleForm,
				setToggleForm,
				displayForm,
				hideForm,
				addTasks,
				allItems,
				update,
				setUpdate,
				deleteItems,
				itemId,
				updateTasks,
				updateInfo,
				updateItemInfo,
				itemInfo,
				tasks,
				team
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
