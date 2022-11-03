import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const nounsUrl = 'https://edwardtanguay.vercel.app/share/germanNouns.json';
const localStorageVariableName = 'noun-game-state';

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
			let _nouns: INoun[] = [];
			const localStorageNouns = localStorage.getItem(
				localStorageVariableName
			);
			if (localStorageNouns !== null) {
				_nouns = JSON.parse(localStorageNouns);
			} else {
				const response = await axios.get(nounsUrl);
				const rawNouns = response.data;
				_nouns = [];
				rawNouns.forEach((rawNoun: any) => {
					const _noun: INoun = {
						...rawNoun,
						isOpen: false,
						isLearned: false,
					};
					_nouns.push(_noun);
				});
			}
			setNouns(_nouns);
		})();
	}, []);
	
	const saveApplicationState = () => {
		localStorage.setItem(localStorageVariableName, JSON.stringify(nouns));
		setNouns([...nouns]);
	};

	const handleToggleFlashcard = (noun: INoun) => {
		noun.isOpen = !noun.isOpen;
		saveApplicationState();
	};

	const handleMarkAsLearned = (noun: INoun) => {
		noun.isLearned = true;
		saveApplicationState();
	};

	const getNumberLearned = () => {
		return nouns.reduce(
			(total, noun) => total + (noun.isLearned ? 1 : 0),
			0
		);
	};

	const handleResetButton = () => {
		localStorage.removeItem(localStorageVariableName);
		window.location.reload();
	}

	return (
		<div className="App">
			<h1>German Nouns ({getNumberLearned()} learned so far)</h1>
			<h2>
				You have learned {getNumberLearned()} of {nouns.length} nouns. <button onClick={() => handleResetButton()}>Reset</button>
			</h2>
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
											<button
												onClick={() =>
													handleMarkAsLearned(noun)
												}
											>
												Mark as learned
											</button>
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
