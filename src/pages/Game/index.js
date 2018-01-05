import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Modes from './components/Modes';
import WeaponList from './components/WeaponList';
import Result from './components/Result';

const weapons = {
        rock: {
                wins: ['scissors'],
        },
        paper: {
                wins: ['paper'],
        },
};

const modes = {
        vs: {
                label: 'Player VS Computer',
                player1Label: 'Computer',
                player2Label: 'Player',
        },
        simulate: {
                label: 'Computer VS Computer',
                player1Label: 'Computer 1',
                player2Label: 'Computer 2',
        }
};

const modeKeys = Object.keys(modes);
const weaponKeys = Object.keys(weapons);

export const getRandomWeapon = () => {
        return weaponKeys[ weaponKeys.length * Math.random() << 0];
};

export const getWinner = (weapon1, weapon2) => {
        if (weapon1 === weapon2) return 0;
        return weapons[weapon1].wins.some(wins => wins === weapon2) ? 1 : 2;
}

const initialState = {
        mode: modeKeys[0],
        player1: {
                loading: false,
                weapon: null,
                score: 0,
        },
        winner: null,
};

class Game extends Component {
        state = initialState
        play(weapon) {
                const weapon1 = getRandomWeapon();
                const weapon2 = weapon || getRandomWeapon();
                const simulateMode = this.state.mode === modeKeys[1];

                this.setState({
                        player1: {
                            ...this.state.player1,
                            weapon: weapon1,
                            loading: true,
                        },
                        player2: {
                            ...this.state.player2,
                            weapon: weapon2,
                            ...((simulateMode) ? { loading: true } : {}),
                        },
                });
                setTimeout(() => {
                        this.setResult();
                }, 500 + Math.random() * 500)
        }

        setResult() {
                const winner = getWinner(this.state.player1.weapon, this.state.player2.weapon);

                this.setState({
                        player1: {
                            ...this.state.player1,
                            ...((winner === 1) ? { score: this.state.player1.score + 1} : {}),
                            loading: false,
                        },
                        player2: {
                            ...this.state.player2,
                            ...((winner === 2) ? { score: this.state.player2.score + 1} : {}),
                        },
                        winner,
                });
        }

        restart() {
                this.setState(initialState);
        }

        toggleMode() {
                const mode = this.state.mode;
                this.reset();
                this.setState({ mode: mode === modeKeys[0] ? modeKeys[1] : modeKeys[0] });
        }

        render() {
                const{ player1Label, player2Label } = modes[this.state.mode];
                const loading = (this.state.player1.loading || this.state.player2.loading);
                return (
                        <div styleName = "Game">
                                <h1>
                                        Rock, Paper, Scissors
                                </h1>

                                <div className = "modes">
                                        <Modes
                                                onClickMode={() => this.toggleMode()}
                                                label = {modes[this.state.mode].label}
                                        />
                                </div>

                                <div className = "footer">
                                    {this.state.winner === null && !loading && this.state.mode === modeKeys[0] && (
                                                <WeaponList
                                                        weapons = {weaponKeys}
                                                        onClickWeapon = { weapon => this.play(weapon)}
                                                />
                                    )}

                                    {(this.state.winner !== null || loading || this.state.mode === modeKeys[1]) && (
                                        <Result
                                                player1Label = {player1Label}
                                                player2Label = {player2Label}
                                                winner = { this.state.winner}
                                                loading = {loading}
                                                onClickPlay = {() => this.state.mode === modeKeys [1] ?
                                                        this.play() : this.restart()
                                                }
                                        />
                                    )}
                                </div>
                        </div>
                );
        }
}

export default CSSModules(Game, styles);
