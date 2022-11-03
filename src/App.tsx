import { useState, useEffect } from 'react';
import './App.scss';

function App() {
	const [nouns, setNouns] = useState([]);

	return (
		<div className="App">
			<h1>German Nouns</h1>
			<p>There are {nouns.length} nouns.</p>
		</div>
	);
}

export default App;