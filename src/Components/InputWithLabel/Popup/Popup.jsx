import React from 'react';
import styles from './popup.module.scss';

const Popup = (props) => {
    const { data, setSelectedOption } = props;
    return (
        <div className={styles.popup}>
            {data.map((item, index) => {
                return (
                    <p key={index} className={styles.option} onClick={() => setSelectedOption(item.option)}>{item.option}</p>
                )
            })}
        </div>
    )
}

export default Popup
