/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
	const { activityStore } = useStore();

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	//#region ---- Select Activities Handlers (no MobX)----

	// const handleSelected = (id: string) => {
	// 	setSelected(
	// 		activities.find((x) => {
	// 			return x.id === id;
	// 		})
	// 	);
	// };
	// const handleCancelSelected = () => {
	// 	setSelected(undefined);
	// };

	// function handleFormOpen(id?: string) {
	// 	id ? handleSelected(id) : handleCancelSelected();
	// 	setEdit(true);
	// }

	// const handleFormClose = () => {
	// 	setEdit(false);
	// };
	//#endregion

	//#region ---- Create or Edit Handler (no MobX)----
	// const handleCreateOrEdit = (activity: Activity) => {
	// 	setSubmitting(true);
	// 	if (activity.id) {
	// 		agent.Activities.update(activity).then(() => {
	// 			setActivities([...activities, { ...activity, id: uuid() }]);
	// 			setSelected(activity);
	// 			setEdit(false);
	// 			setSubmitting(false);
	// 		});
	// 	} else {
	// 		activity.id = uuid();
	// 		agent.Activities.create(activity).then(() => {
	// 			setActivities([...activities, activity]);
	// 			setSelected(activity);
	// 			setEdit(false);
	// 			setSubmitting(false);
	// 		});
	// 	}
	// };
	//#endregion

	//#region  --- Delete Activity Handler ( no MobX) ----
	// const handleDelete = (id: string) => {
	// 	setSubmitting(true);
	// 	agent.Activities.delete(id).then(() => {
	// 		setActivities([...activities.filter((x) => x.id !== id)]);
	// 		setSubmitting(false);
	// 	});
	// };
	//#endregion

	if (activityStore.loadingInitial) {
		return <LoadingComponent content="Loading" />;
	}

	return (
		<React.Fragment>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard />
			</Container>
		</React.Fragment>
	);
}

export default observer(App);
