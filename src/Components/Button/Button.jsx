import React from 'react';
import { SvgArrow } from '../../static/Svgs';
import styles from './button.module.scss';

const Button = (props) => {
    const { title, varient, customClass, showArrow, onClickHandler } = props;
    return (
        <button className={`${styles.btn} ${styles[varient]} ${customClass}`} onClick={onClickHandler}>{title}{showArrow ? <SvgArrow /> : null}</button>
    )
}

export default Button
