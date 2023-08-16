import React from "react";
import { Card, Button, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
	activity: Activity | undefined;
	cancelSelected: () => void;
	openForm: (id?: string) => void;
}

const ActivityDetails = ({ activity, cancelSelected, openForm }: Props) => {
	return (
		<Card fluid>
			<Image
				src={`/assets/categoryImages/${activity?.category}.jpg`}
				wrapped
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{activity?.title}</Card.Header>
				<Card.Meta>
					<span className="date">{activity?.date}</span>
				</Card.Meta>
				<Card.Description>{activity?.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						onClick={() => openForm(activity?.id)}
						basic
						color="blue"
						content="Edit"
					></Button>
					<Button
						onClick={cancelSelected}
						basic
						color="grey"
						content="Cancel"
					></Button>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default ActivityDetails;
