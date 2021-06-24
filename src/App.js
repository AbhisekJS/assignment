import Task from './Tasks/Tasks';
import Form from './Form/Form';
import Thumbnails from './Thumbnails/Thumbnails';
import { useGlobalContext } from './context';

export default function App() {
	const { toggleForm, allItems, tasks } = useGlobalContext();
	console.log(allItems.length);
	console.log(tasks.length);

	return (
		<div className="container">
			<Task totalTasks={allItems.length} />

			{toggleForm && <Form />}

			{allItems &&
				allItems.map((items, index) => (
					<div key={items.id}>
						<Thumbnails items={items} />
					</div>
				))}
		</div>
	);
}
