import React, { Component } from 'react';
import PCMan from './img/pacman.png';
import Ghost from './img/ghost1.png';
import Wall from './img/wall.png';
import Coin from './img/coin.png';
import Bg from './img/bg.png';
import './App.scss';
import { Board } from './board'

export default class Pacman extends Component {

    state = {
        pacman: {
            y: 4,
            x: 10
        },
        ghost: {
            y: 1,
            x: 1
        }
    }

    // wall - 1
    // coin - 2
    // bg - 3
    // pacman - 4
    // ghost - 5

    points = 0;
    ghostMove;

    endGameAlert() {
        window.location.reload();
        alert('Koniec gry')
    }


    checkEngGame() {
        const { pacman, ghost } = this.state;

        if (ghost.x === pacman.x) {
            if (ghost.y === pacman.y) {
                this.endGameAlert();
            }
        }
    }

    checkAvaibleCoins() {
        let coinsTable = [];
        Board.map(element => element.map(thing => coinsTable.push(thing)));
        const avaibleCoins = coinsTable.filter(coin => coin === 2);
        if (!avaibleCoins.length) return this.endGameAlert()
    }

    checkIfPlayerCanMove = (y, x, a, b = 0) => {
        if (Board[y - a][x - b] !== 1) {
            if (Board[y - a][x - b] === 2) this.points += 10;
            Board[y][x] = 3;
            Board[y - a][x - b] = 4;
            this.setState(prevState => {
                return {
                    pacman: {
                        y: prevState.pacman.y - a,
                        x: prevState.pacman.x - b
                    }
                }
            })
        }
        else return false
    }

    checkIfGhostCanMove = (y, x, a, b) => {
        if (Board[y - a][x - b] !== 1) {
            Board[y][x] = 3;
            Board[y - a][x - b] = 5;
            this.setState(prevState => {
                return {
                    ghost: {
                        y: prevState.ghost.y - a,
                        x: prevState.ghost.x - b
                    }
                }
            })
        }
    }

    moveGhost() {
        const { x, y } = this.state.ghost;
        const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        let a = Math.floor(Math.random() * 2);
        let b;
        if (a === 1) b = 0;
        else b = 1 * plusOrMinus;

        a *= plusOrMinus;

        this.checkIfGhostCanMove(y, x, a, b);
        this.checkEngGame();
    }

    movePacman = keyCode => {
        const { x, y } = this.state.pacman;

        if (keyCode === 38) this.checkIfPlayerCanMove(y, x, 1)
        else if (keyCode === 40) this.checkIfPlayerCanMove(y, x, -1)
        else if (keyCode === 37) this.checkIfPlayerCanMove(y, x, 0, 1)
        else if (keyCode === 39) this.checkIfPlayerCanMove(y, x, 0, -1)
        else return null

        this.checkEngGame();
        this.checkAvaibleCoins();
    }

    componentDidMount() {
        document.addEventListener("keydown", e => this.movePacman(e.keyCode));
        this.ghostMove = setInterval(() => {
            this.moveGhost()
        }, 300);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", e => this.movePacman(e.keyCode));
        clearInterval(this.ghostMove)
    }

    renderBoard = number => {
        if (number === 1) return <img src={Wall} alt='' />;
        else if (number === 2) return <img src={Coin} alt='' />
        else if (number === 3) return <img src={Bg} alt='' />
        else if (number === 4) return <img src={PCMan} alt='' />
        else if (number === 5) return <img src={Ghost} alt='' />
        else return null
    }

    renderGame() {
        return Board.map(element => element.map(thing => this.renderBoard(thing)))
    }

    render() {
        return (
            <>
                <div className='game'>
                    {this.renderGame()}
                </div>
                <p className='result'>{this.points}</p>
            </>
        )
    }
}
