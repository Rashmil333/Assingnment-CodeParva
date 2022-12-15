import { useCallback, useState } from 'react';
import Button from '../../../Components/Button/Button';
import InputWithLabel from '../../../Components/InputWithLabel/InputWithLabel';
import { BreedData, Fields, Petata } from '../../../constant';
import styles from './form.module.scss';


const Form = (props) => {
    const { caption, ques, submitbtnName, onSubmit } = props;
    const [reset, setReset] = useState(false);
    const [formData, setFormData] = useState({});
    const formHandler = useCallback((category, value) => {
        const updatedData = { ...formData };
        switch (category) {
            case Fields.PETNAME:
                console.log('petname');
                updatedData.petName = value;
                break;
            case Fields.BREED:
                console.log('breed')
                updatedData.breed = value;
                break;
            case Fields.FULLNAME:
                console.log('fullname')
                updatedData.fullname = value;
                break;
            case Fields.EMAIL:
                console.log('email')
                updatedData.email = value;
                break;
            case Fields.PHONE:
                console.log('phone')
                updatedData.phone = value;
                break;
            default: console.log('kk');
        }
        setFormData(updatedData);
    }, [formData, setFormData]);

    return (
        <div className={styles.formWrapper}>
            <p className={styles.caption}>{caption}</p>
            <p className={styles.firstQues}>{ques}</p>
            <InputWithLabel
                id={Fields.PETNAME}
                label='Pet type'
                varient='dropdown'
                data={Petata}
                onChange={formHandler}
                reset={reset}
            />
            <InputWithLabel
                id={Fields.BREED}
                label='Breed'
                varient='dropdown'
                data={BreedData}
                placeholder="Select"
                type="text"
                onChange={formHandler}
                reset={reset}
            />
            <p className={styles.firstQues}>Please fill in your details</p>
            <InputWithLabel
                id={Fields.FULLNAME}
                label='Full Name'
                placeholder="Select"
                type="text"
                onChange={formHandler}
                reset={reset}
            />
            <InputWithLabel
                id={Fields.EMAIL}
                label='Email'
                placeholder="Select"
                type="text"
                onChange={formHandler}
                reset={reset}
            />
            <InputWithLabel
                id={Fields.PHONE}
                label='Phone'
                placeholder="Select"
                type="number"
                max={10}
                onChange={formHandler}
                reset={reset}
            />

            <div className={styles.submitbtn}>
                <Button title={submitbtnName} varient='pink' onClickHandler={() => { onSubmit(formData, setReset, setFormData); console.log(formData); }} />
            </div>
            {/* {errors.length > 0 ? <p className={styles.error}>Please fill {errors.join(', ')}</p> : null} */}
        </div>
    )
}

export default Form
