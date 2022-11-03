import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json';

interface INoun {
	article: string;
	singular: string;
	plural: string;
	isOpen: boolean;
	isLearned: boolean;
}

function App() {
	const [nouns, setNouns] = useState<INoun[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(nounsUrl);
			const rawNouns = response.data;
			const _nouns: INoun[] = [];
			rawNouns.forEach((rawNoun: any) => {
				const _noun: INoun = {
					...rawNoun,
					isOpen: false,
					isLearned: false,
				};
				_nouns.push(_noun);
			});
			setNouns(_nouns);
		})();
	}, []);

	const handleToggleFlashcard = (noun: INoun) => {
		noun.isOpen = !noun.isOpen;
		setNouns([...nouns]);
	};

	return (
		<div className="App">
			<h1>German Nouns</h1>
			<h2>There are {nouns.length} nouns.</h2>
			<div className="nouns">
				{nouns.map((noun) => {
					return (
						<React.Fragment key={noun.singular}>
							{!noun.isLearned && (
								<div className="noun">
									<div
										className="front"
										onClick={() =>
											handleToggleFlashcard(noun)
										}
									>
										{noun.singular}
									</div>
									{noun.isOpen && (
										<div className="back">
											<div className="singular">
												{noun.article} {noun.singular}
											</div>
											<div className="plural">
												{noun.plural}
											</div>
											<button>Mark as learned</button>
										</div>
									)}
								</div>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}

export default App;
