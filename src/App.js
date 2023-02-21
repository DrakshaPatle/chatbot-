
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
const steps = [
	{
		id: '0',
		message: 'Hey Whatsapp!',
		trigger: '1',
	},
	{
		id: '1',
		message: 'What is your name?',
		trigger: 'name',
	},
	{
		id: 'name',
		user: true,
		trigger: '3',
	},
	{
		id: '3',
		message: 'Hi {previousValue}, how old are you?',
		trigger: 'age',
	},

	{
		id: 'age',
		user: true,

		validator: (value) => {
			if (isNaN(value)) {
				return 'Value must be a number';
			} else if (value < 0) {
				return 'Value must be positive';
			} else if (value > 120) {
				return `${value}? Come on!`;
			}
			return true;
		},

		trigger: 'family',


	},


	{
		id: 'family',

		message: 'How many family members do you have?',
		trigger: 'familyCount',

	},

	{
		id: 'familyCount',
		user: true,
		trigger: (value) => {
			const familyCount = parseInt(value);
			const familySteps = [];
			for (let i = 1; i <= familyCount; i++) {
				familySteps.push({
					id: `familyMemberName${i}`,
					message: `Enter the name of family member ${i}:`,
					trigger: `name${i}`,
				});
				familySteps.push({
					id: `name${i}`,
					user: true,
					trigger: `familyMemberAge${i}`,
				});
				familySteps.push({
					id: `familyMemberAge${i}`,
					message: `Enter the age of family member ${i}:`,
					trigger: `age${i}`,
					validator: (value) => {
						if (isNaN(value)) {
							return 'Value must be a number';
						} else if (value < 0) {
							return 'Value must be positive';
						} else if (value > 120) {
							return `${value}? Come on!`;
						}
						return true;
					},
				});
				familySteps.push({
					id: `age${i}`,
					user: true,
					trigger: `familyMemberName${i + 1}`,
				});
			}
			steps.push(...familySteps);
			return 'end';
		},
	},
	  

  ];


// Creating our own theme
const theme = {
	background: '#C9FF8F',
	headerBgColor: '#197B22',
	headerFontSize: '20px',
	botBubbleColor: '#0F3789',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
};

// Set some properties of the bot
const config = {
	botAvatar: "https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=",
	floating: true,
};

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>

				<ChatBot
					headerTitle="GeekBot"

					steps={steps}
					floating={true}
					floatingStyle={{
						left: 'calc(50% - 128px)',
						right: 'initial',
						transformOrigin: 'top center',
						borderRadius: 0,
					}}
					style={{
						left: 'calc(50% - 175px)',
						bottom: 'calc(500%-776px)',

					}}
					{...config}
				/>

			</ThemeProvider>
		</div>
	);
}

export default App;
