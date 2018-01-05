import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.scss';
import Button from 'src/components/Button';

const Result = ({ winner, player1label, player2label, onClickPlay, loading}) => (
        <div styleName = "Result">
                {winner !== null && !loading && (
                        <div className = "winner">
                                <span>
                                        {winner === 0 ? 'Tie' : `${(winner === 1 ? player1label : player2label)} Wins`}
                                </span>
                        </div>
                )}
                <div className = "play">
                        <Button
                                disabled = {loading}
                                onClick = {onClickPlay}
                        >
                                Play {(loading || winner !== null) && 'Again'}
                        </Button>
                </div>
        </div>
);

export default CSSModules(Result, styles);