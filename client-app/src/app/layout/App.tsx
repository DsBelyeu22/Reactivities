/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selected, setSelected] = useState<Activity | undefined>(undefined);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		axios
			.get<Activity[]>("http://localhost:5000/api/activities")
			.then((response) => {
				setActivities(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSelected = (id: string) => {
		setSelected(
			activities.find((x) => {
				return x.id === id;
			})
		);
	};
	const handleCancelSelected = () => {
		setSelected(undefined);
	};

	function handleFormOpen(id?: string) {
		id ? handleSelected(id) : handleCancelSelected();
		setEdit(true);
	}

	const handleFormClose = () => {
		setEdit(false);
	};

	const handleCreateOrEdit = (activity: Activity) => {
		activity.id
			? setActivities([
					...activities.filter((oldActivity) => oldActivity.id !== activity.id),
			  ])
			: setActivities([...activities, { ...activity, id: uuid() }]);
		setEdit(false);
		setSelected(activity);
	};

	const handleDelete = (id: string) => {
		setActivities([...activities.filter((x) => x.id !== id)]);
	};

	return (
		<>
			<NavBar openForm={handleFormOpen} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selected}
					selectActivity={handleSelected}
					cancelSelect={handleCancelSelected}
					editMode={edit}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					onCreateOrEditClick={handleCreateOrEdit}
					deleteActivity={handleDelete}
				></ActivityDashboard>
			</Container>
		</>
	);
}

export default App;
