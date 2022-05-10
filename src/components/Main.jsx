import React, { useState, useEffect, useRef } from 'react';

export const Main = _ => {
	const START_TIME = 15;
	const [isGame, setIsGame] = useState(false);
	const [text, setText] = useState('');
	const [time, setTime] = useState(START_TIME);
	const [wordCount, setWordCount] = useState(0);
	const textBoxRef = useRef(null);

	const timer = _ =>
		isGame && time > 0 && setTimeout(_ => setTime(prevTime => prevTime - 1), 1000);

	const getText = event => setText(event.target.value);

	const wordsCounter = text =>
		text
			.trim()
			.split(' ')
			.filter(word => word !== '').length;

	useEffect(
		_ => {
			timer();
			time === 0 && gameEnd();
		},
		[isGame, time]
	);

	function bestWordCount() {
		localStorage.getItem('word') ?? localStorage.setItem('word', JSON.stringify(wordCount));
		wordCount > JSON.parse(localStorage.getItem('word')) &&
			localStorage.setItem('word', JSON.stringify(wordCount));
	}

	const gameStart = _ => {
		setTime(START_TIME);
		setText('');
		setWordCount(0);
		textBoxRef.current.disabled = false;
		textBoxRef.current.focus();
		setIsGame(true);
		bestWordCount();
	};

	const gameEnd = _ => {
		setIsGame(false);
		setWordCount(wordsCounter(text));
	};

	return (
		<main className="main">
			<textarea
				className="main__textbox"
				value={text}
				onChange={getText}
				ref={textBoxRef}
				disabled={!isGame}
			/>
			<p className="main__timer">Time remaining: {time}</p>
			<button className="main__button" onClick={gameStart} disabled={isGame}>
				Start
			</button>
			<p className="main__counter">Word Count: {wordCount}</p>
			<p className="main__best-count">
				Best Count: {JSON.parse(localStorage.getItem('word')) ?? wordCount}
			</p>
		</main>
	);
};
