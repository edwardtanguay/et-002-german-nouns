import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json';

function App() {
	const [nouns, setNouns] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(nounsUrl);
			const _nouns = response.data;
			setNouns(_nouns);
		})();
	}, []);

	return (
		<div className="App">
			<h1>German Nouns</h1>
			<p>There are {nouns.length} nouns.</p>
		</div>
	);
}

export default App;