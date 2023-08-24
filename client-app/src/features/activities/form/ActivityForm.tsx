import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
	const { activityStore } = useStore();
	const {
		selectedActivity,
		closeForm,
		createActivity,
		updateActivity,
		loading,
	} = activityStore;
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
		activity.id ? updateActivity(activity) : createActivity(activity);
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
			<Form onSubmit={handleSubmit}>
				<Form.Input
					placeholder="Title"
					name="title"
					onChange={handleInputChange}
					type="text"
					value={activity.title}
				/>
				<Form.TextArea
					placeholder="Description"
					name="description"
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
					type="date"
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
					loading={loading}
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
});
