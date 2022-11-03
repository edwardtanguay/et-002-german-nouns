import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json';

interface INoun {
	article: string;
	singular: string;
	plural: string;
}

function App() {
	const [nouns, setNouns] = useState<INoun[]>([]);

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
			<h2>There are {nouns.length} nouns.</h2>
			<div className="nouns">
				{nouns.map((noun) => {
					return (
						<div className="noun" key={noun.singular}>
							{noun.singular}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
