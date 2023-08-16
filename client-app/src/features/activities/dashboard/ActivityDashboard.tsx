import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
	activities: Activity[];
	selectedActivity: Activity | undefined;
	selectActivity: (id: string) => void;
	cancelSelect: () => void;
	editMode: boolean;
	openForm: (id?: string) => void;
	closeForm: () => void;
	onCreateOrEditClick: (activity: Activity) => void;
	deleteActivity: (id: string) => void;
}

const ActivityDashboard = ({
	activities,
	selectedActivity,
	selectActivity,
	cancelSelect,
	editMode,
	openForm,
	closeForm,
	onCreateOrEditClick,
	deleteActivity,
}: Props) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList
					activities={activities}
					selectActivity={selectActivity}
					deleteActivity={deleteActivity}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedActivity && !editMode && (
					<ActivityDetails
						activity={selectedActivity}
						cancelSelected={cancelSelect}
						openForm={openForm}
					></ActivityDetails>
				)}
				{editMode && (
					<ActivityForm
						onCreateOrEditClick={onCreateOrEditClick}
						closeForm={closeForm}
						activity={selectedActivity}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default ActivityDashboard;
