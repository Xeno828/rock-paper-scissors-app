import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Button from 'src/components/Button';

const Modes = ({ label, onClickMode }) => (
        <div styleName = "Modes">
            <span className = "label">{label}</span><br />
            <Button
                    onClick = {onClickMode}
            >
                    Change Mode
            </Button>
        </div>
);

Modes.propTypes = {
        label: PropTypes.string.isRequired,
        onClickMode: PropTypes.func.isRequired,
};

export default CSSModules(Modes, styles);