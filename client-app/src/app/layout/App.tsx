/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selected, setSelected] = useState<Activity | undefined>(undefined);
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			let activities: Activity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				activities.push(activity);
			});
			setActivities(activities);
			setLoading(false);
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
		setSubmitting(true);
		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setActivities([...activities, { ...activity, id: uuid() }]);
				setSelected(activity);
				setEdit(false);
				setSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setSelected(activity);
				setEdit(false);
				setSubmitting(false);
			});
		}
	};

	const handleDelete = (id: string) => {
		setSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities([...activities.filter((x) => x.id !== id)]);
			setSubmitting(false);
		});
	};

	if (loading) {
		return <LoadingComponent content="Loading Your Application" />;
	}

	return (
		<React.Fragment>
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
					submitting={submitting}
				></ActivityDashboard>
			</Container>
		</React.Fragment>
	);
}

export default App;
