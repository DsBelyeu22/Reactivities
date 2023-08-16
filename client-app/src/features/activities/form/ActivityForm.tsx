import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
	activity: Activity | undefined;
	closeForm: () => void;
	onCreateOrEditClick: (activity: Activity) => void;
}

export default function ActivityForm({
	activity: selectedActivity,
	closeForm,
	onCreateOrEditClick,
}: Props) {
	const initState = selectedActivity ?? {
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: "",
	};
	const [activity, setActivity] = useState(initState);
	const handleSubmit = () => {
		onCreateOrEditClick(activity);
		console.log(activity);
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		//#region
		// const target = event.target;
		// const value = target.value;
		// const name = target.name;
		// setActivity((prevState) => {
		// 	const newState = {
		// 		...prevState,
		// 	};

		// 	newState[name] = value;
		// 	return newState;
		// });
		//#endregion
		//  Destructrued
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	};
	return (
		<Segment clearing>
			<Form>
				<Form.Input
					placeholder="Title"
					name="title"
					onChange={handleInputChange}
					type="text"
					value={activity.title}
				/>
				<Form.TextArea
					placeholder="Description"
					name="Description"
					onChange={handleInputChange}
					type="text"
					value={activity.description}
				/>
				<Form.Input
					placeholder="Category"
					name="category"
					onChange={handleInputChange}
					type="text"
					value={activity.category}
				/>
				<Form.Input
					placeholder="Date"
					name="date"
					onChange={handleInputChange}
					type="text"
					value={activity.date}
				/>
				<Form.Input
					placeholder="City"
					name="city"
					onChange={handleInputChange}
					type="text"
					value={activity.city}
				/>
				<Form.Input
					placeholder="Venue"
					name="venue"
					onChange={handleInputChange}
					type="text"
					value={activity.venue}
				/>
				<Button
					onClick={handleSubmit}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					onClick={closeForm}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
}
