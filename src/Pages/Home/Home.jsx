import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Modal from '../../Components/Modal/Modal';
import { DATA, WELCOMEDATA } from '../../constant';
import { formValidationHandler, INDEXDBNEW, Notify } from '../../helpers';
import { SvgCatandLady, SvgDogsAndCats } from '../../static/Svgs';
import styles from './/home.module.scss';
import Form from './Form/Form';
import TableComponent from './TableComponent/TableComponent';

const Home = () => {
    const [showModal, setShowModal] = useState({
        active: '',
        open: false
    });
    const submitHandler = useCallback((formData, setReset, setFormData) => {
        const result = formValidationHandler(['petName', 'breed', 'fullname', 'email', 'phone'], formData);
        if (!result.validated) {
            Notify(`Please fill required fields ${result.unfilled.join(', ')}`);
        } else if (showModal.active === 'adopt') {
            INDEXDBNEW.addInDb('adoptionData', 'userData', formData);
        } else {
            INDEXDBNEW.addInDb('giveAwayData', 'userData', formData);
        }
        if (result.validated) {
            setFormData({});
            setReset(Math.random());
        }
    }, [showModal]);
    useEffect(() => {
        INDEXDBNEW.createDb('adoptionData', 'userData');
        INDEXDBNEW.createDb('giveAwayData', 'userData');
    }, []);
    return (
        <>
            <Header />
            <div className={styles.main}>
                <div className={styles.welcomeSection}>
                    <div className={styles.leftContatiner}>
                        <p className={styles.welcomeTitle}>{WELCOMEDATA.title}</p>
                        <p className={styles.welcomeDesc}>{WELCOMEDATA.description}</p>
                    </div>
                    {<SvgDogsAndCats />}
                </div>
                <div className={styles.buttons}>
                    <Button title='Adopt' varient='pink' onClickHandler={() => setShowModal({ active: 'adopt', open: true })} />
                    <Button title='What all pets do we have ?' onClickHandler={() => setShowModal({ active: 'allPets', open: true })} />
                </div>
                <div className={styles.giveAwaySec}>
                    <p className={styles.giveAwayTitle}>{DATA.title}</p>
                    <p className={styles.giveAwayDesc}>{DATA.description}</p>
                    <Button
                        title='Give Away'
                        customClass={styles.giveAwaybtn}
                        onClickHandler={() => setShowModal({ active: 'giveaway', open: true })}
                    />
                </div>
                <div className={styles.lastSec}>
                    <SvgCatandLady />
                    <p className={styles.lastdesc}>{DATA.description}</p>
                </div>
            </div>
            {showModal.open ?
                (
                    <Modal close={() => {
                        setShowModal({ active: '', open: false });
                        document.body.style.overflow = 'scroll'
                    }} >
                        {showModal.active === 'allPets' ? (
                            <TableComponent />
                        ) :
                            (<Form
                                caption={showModal.active === 'adopt' ? 'Adopt a pet' : 'Give Away'}
                                ques={showModal.active === 'adopt' ? 'What pet do you want to adopt ?' : 'What pet do you want to give away ?'}
                                submitbtnName={showModal.active === 'adopt' ? 'REQUEST FOR ADOPTION' : 'REQUEST FOR GIVE AWAY'}
                                onSubmit={submitHandler}
                            />)}

                    </Modal>
                ) : null}
            <Footer />
        </>
    )
}

export default Home
