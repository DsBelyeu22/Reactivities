import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

const NavBar = () => {
	const { activityStore } = useStore();
	return (
		<>
			<Menu
				inverted
				fixed="top"
			>
				<Container>
					<Menu.Item header>
						<img
							style={{ marginRight: 10 }}
							src="/assets/logo.png"
							alt="logo"
						/>
						Reactivities
					</Menu.Item>
					<Menu.Item name="Activies" />
					<Menu.Item>
						<Button
							onClick={() => activityStore.openForm()}
							positive
							content="Create Activity"
						></Button>
					</Menu.Item>
				</Container>
			</Menu>
		</>
	);
};

export default NavBar;
