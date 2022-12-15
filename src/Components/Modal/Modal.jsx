import { useEffect } from 'react';
import { CrossIcon } from '../../static/Svgs';
import styles from './modal.module.scss';

const Modal = (props) => {
    const { children, close } = props;
    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalBody}>
                {children}
            </div>
            <span className={styles.crossicon} onClick={close}><CrossIcon /></span>
        </div>
    )
}

export default Modal