import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { Notify } from '../../helpers';
import { DropArrow } from '../../static/Svgs';
import OutsideClickHandler from '../OutsideClickHandler/OutsideClickHandler';
import styles from './inputwithlabel.module.scss';
import Popup from './Popup/Popup';

const InputWithLabel = (props) => {
    const { id, label, onChange, reset, varient, type, data, placeholder, max } = props;
    const [selectedOption, setSelectedOption] = useState('Select');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const inputHandler = useCallback((value) => {
        let updatedValue = value;
        if (type === "number" && isNaN(value)) {
            Notify('Please type valid number')
            updatedValue = value.slice(0, value.length - 1)
        } else if (type === "number" && value.length > max) {
            Notify('Maximum phone number can be 10 digits')
            updatedValue = value.slice(0, max);
        }
        setInputVal(updatedValue);
        onChange(id, updatedValue);
    }, [onChange, setInputVal, id, max, type]);

    const selectHandler = useCallback((value) => {
        onChange(id, value);
        setSelectedOption(value);
    }, [id, setSelectedOption, onChange]);
    useEffect(() => {
        setInputVal('');
        setSelectedOption('Select');
    }, [reset])
    return (
        <div className={styles.inputWithlabel}>
            <p className={styles.label}>{label}  <span className={styles.star}>*</span></p>
            {varient === 'dropdown' ? (
                <OutsideClickHandler onClickOutSide={() => setOpenDropdown(false)}>
                    <div className={styles.select} onClick={() => setOpenDropdown(!openDropdown)}>
                        <p className={styles.selected}>{selectedOption}</p>
                        <DropArrow />
                        {openDropdown ? (<Popup data={data} setSelectedOption={selectHandler} />) : null}
                    </div>
                </OutsideClickHandler>

            ) : (<input type="text" value={inputVal} onChange={(e) => inputHandler(e.target.value)} className={styles.input} placeholder={placeholder} />)}

        </div>
    )
}

export default InputWithLabel