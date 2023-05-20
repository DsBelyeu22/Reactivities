/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List, Button } from "semantic-ui-react";

function App() {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/activities")
			.then((response) => {
				console.log(response);
				setActivities(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<>
			<Header
				as="h2"
				icon="users"
				content="Reactivities"
			/>

			<List>
				{activities.map((activity: any) => (
					<List.Item key={activity.id}>{activity.title}</List.Item>
				))}
			</List>
		</>
	);
}

export default App;
