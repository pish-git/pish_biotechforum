"use client";

import { useState, useEffect, useRef } from 'react';
import './level_one.css';
import './level_one_media.css';

import WelcomePart from '../welcome_part/WelcomePart';
import TutorialPart from '../tutorial_part/TutorialPart';
import MainPart from '../main_part/MainPart';

export default function LevelOne({ stateButton, funForButton, hiddenStatus, step, onNextLevel }) {
	const [removeWelcomeFromDOM, setRemoveWelcomeFromDOM] = useState(false);
	const [showTutorial, setShowTutorial] = useState(false);
	const [showMain, setShowMain] = useState(false);
	const [mainPartHidden, setMainPartHidden] = useState(true);

	const [gameStarted, setGameStarted] = useState(false);
	const [currentPairIndex, setCurrentPairIndex] = useState(0);
	const [firstRowNotes, setFirstRowNotes] = useState([]);
	const [secondRowNotes, setSecondRowNotes] = useState([]);
	const [activeNoteIndex, setActiveNoteIndex] = useState(null);
	const [timerActive, setTimerActive] = useState(false);
	const [score, setScore] = useState(0);
	const [gameCompleted, setGameCompleted] = useState(false);
	const [gameResult, setGameResult] = useState(null);

	const timerRef = useRef(null);
	const timerActiveRef = useRef(false);

	const notePairs = [
		{ first: 'C', second: 'G' },
		{ first: 'G', second: 'C' },
		{ first: 'G', second: 'C' },
		{ first: 'C', second: 'G' },
		{ first: 'A', second: 'U' },
		{ first: 'T', second: 'A' },
		{ first: 'G', second: 'C' },
		{ first: 'A', second: 'U' },
		{ first: 'C', second: 'G' },
		{ first: 'T', second: 'A' },
		{ first: 'G', second: 'C' },
		{ first: 'A', second: 'U' }
	];

	const initGame = () => {
		setFirstRowNotes(Array(12).fill(''));
		setSecondRowNotes(Array(12).fill(''));
		setCurrentPairIndex(0);
		setActiveNoteIndex(null);
		setTimerActive(false);
		timerActiveRef.current = false;
		setScore(0);
		setGameStarted(true);
		setGameCompleted(false);
		setGameResult(null);
	};

	const handleAnswer = (selectedNote) => {
		if (!timerActiveRef.current) {
			return;
		}
		
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		
		setTimerActive(false);
		timerActiveRef.current = false;
		
		const currentPair = notePairs[currentPairIndex];
		const isCorrect = selectedNote === currentPair.second;
		
		const newSecondRow = [...secondRowNotes];
		newSecondRow[currentPairIndex] = selectedNote || '';
		setSecondRowNotes(newSecondRow);
		
		if (isCorrect && selectedNote) {
			setScore(score + 1);
		}
		
		setTimeout(() => {
			setCurrentPairIndex(currentPairIndex + 1);
			setActiveNoteIndex(null);
		}, 500);
	};

	const startNextPair = () => {
		if (currentPairIndex >= notePairs.length) {
			const isWin = score === notePairs.length;
			setGameResult(isWin ? 'win' : 'fail');
			setGameCompleted(true);
			return;
		}

		const currentPair = notePairs[currentPairIndex];
		
		const newFirstRow = [...firstRowNotes];
		newFirstRow[currentPairIndex] = currentPair.first;
		setFirstRowNotes(newFirstRow);

		setActiveNoteIndex(currentPairIndex);
		
		setTimeout(() => {
			setTimerActive(true);
			timerActiveRef.current = true;
			
			timerRef.current = setTimeout(() => {
				if (timerActiveRef.current) {
					handleAnswer(null);
				}
			}, 2000);

		}, 700);
	};

	const handleTutorialShow = () => {
		setShowTutorial(true);
	};

	const handleMainPartShow = () => {
		setShowTutorial(false);
		setShowMain(true);
		setMainPartHidden(true);
		
		setTimeout(() => {
			setMainPartHidden(false);
			setTimeout(() => {
				setTimeout(() => {
					setTimeout(() => {
						initGame();
					}, 3000);
				}, 1000);
			}, 300);
		}, 50);
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (gameStarted && currentPairIndex < notePairs.length) {
			startNextPair();
		} else if (gameStarted && currentPairIndex >= notePairs.length) {
			const isWin = score === notePairs.length;
			setGameResult(isWin ? 'win' : 'fail');
			setGameCompleted(true);
		}
	}, [currentPairIndex, gameStarted]);

	useEffect(() => {
		timerActiveRef.current = timerActive;
	}, [timerActive]);

	return (
		<div className={`level_one ${hiddenStatus ? "_hidden" : ''}`}>
			{!removeWelcomeFromDOM && (
				<WelcomePart 
					onRemoveFromDOM={() => setRemoveWelcomeFromDOM(true)}
					onTutorialShow={handleTutorialShow}
				/>
			)}
			
			{showTutorial && (
				<TutorialPart 
					onMainPartShow={handleMainPartShow}
				/>
			)}
			
			{showMain && (
				<MainPart 
					mainPartHidden={mainPartHidden}
					firstRowNotes={firstRowNotes}
					secondRowNotes={secondRowNotes}
					activeNoteIndex={activeNoteIndex}
					currentPairIndex={currentPairIndex}
					timerActive={timerActive}
					onAnswer={handleAnswer}
					gameCompleted={gameCompleted}
					gameResult={gameResult}
					onNextLevel={onNextLevel}
				/>
			)}
		</div>
	);
}