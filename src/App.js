import React, { useState } from "react";
import "./App.css";

const correctResults = [
	[1, 2, 3],
	[1, 4, 7],
	[1, 5, 9],
	[2, 5, 8],
	[3, 6, 9],
	[3, 5, 7],
	[4, 5, 6],
	[7, 8, 9],
];

function App() {
	const [currentPlayer, setCurrentPlayer] = useState("X");
	const [playerOneResults, setPlayerOneResults] = useState([]);
	const [playerTwoResults, setPlayerTwoResults] = useState([]);
	const [winner, setWinner] = useState("");
	const [movesCount, setMovesCount] = useState(0);

	const checkWinner = () => {
		correctResults.forEach((item) => {
			if (
				playerOneResults.includes(item[0]) &&
				playerOneResults.includes(item[1]) &&
				playerOneResults.includes(item[2])
			) {
				setWinner("Player 1");
			}
			if (
				playerTwoResults.includes(item[0]) &&
				playerTwoResults.includes(item[1]) &&
				playerTwoResults.includes(item[2])
			) {
				setWinner("Player 2");
			}
		});
	};

	const resetGame = () => {
		setPlayerOneResults([]);
		setPlayerTwoResults([]);
		setCurrentPlayer("X");
		setWinner("");
		setMovesCount(0);
	};

	const onCellClick = (cellId) => {
		if (
			playerOneResults.includes(cellId) ||
			playerTwoResults.includes(cellId) ||
			winner
		) {
			return;
		}
		if (currentPlayer === "X") {
			setPlayerOneResults([...playerOneResults, cellId]);
			setCurrentPlayer("O");
		} else {
			setPlayerTwoResults([...playerTwoResults, cellId]);
			setCurrentPlayer("X");
		}
		setMovesCount(movesCount + 1);
		checkWinner();
	};

	const showCellContent = (cellId) => {
		if (playerOneResults.includes(cellId)) {
			return "X";
		} else if (playerTwoResults.includes(cellId)) {
			return "O";
		} else {
			return "";
		}
	};

	const handleRestart = () => {
		resetGame();
	};

	return (
		<div className="container">
			<h1 className="text-center">Tic Tac Toe</h1>
			{winner && (
				<div className="text-center mb-3">
					<h3>{`Winner: ${winner}`}</h3>
					<button className="btn" onClick={handleRestart}>
						Play Again
					</button>
				</div>
			)}
			{movesCount === 9 && !winner && (
				<div className="text-center mb-3">
					<h3>It's a Draw!</h3>
					<button className="btn" onClick={handleRestart}>
						Play Again
					</button>
				</div>
			)}
			<div>
				<div className="row">
					{[1, 2, 3].map((cellId) => (
						<div
							className="cell"
							key={cellId}
							onClick={() => onCellClick(cellId)}
						>
							{showCellContent(cellId)}
						</div>
					))}
				</div>
				<div className="row">
					{[4, 5, 6].map((cellId) => (
						<div
							className="cell"
							key={cellId}
							onClick={() => onCellClick(cellId)}
						>
							{showCellContent(cellId)}
						</div>
					))}
				</div>
				<div className="row">
					{[7, 8, 9].map((cellId) => (
						<div
							className="cell"
							key={cellId}
							onClick={() => onCellClick(cellId)}
						>
							{showCellContent(cellId)}
						</div>
					))}
				</div>
			</div>
			<div className="text-center mt-3">
				<h4>{`Current Player: ${currentPlayer}`}</h4>
				<h4>{`Moves Count: ${movesCount}`}</h4>
			</div>
		</div>
	);
}

export default App;
