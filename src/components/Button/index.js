import React from 'react';
import styles from './styles.scss';
import CSSModules from 'react-css-modules';

const Button = ({ children, ...rest}) => (
    <button
            styleName = "Button"
            {...rest}
        >
            {children}
    </button>
);

export default CSSModules(Button, styles);

