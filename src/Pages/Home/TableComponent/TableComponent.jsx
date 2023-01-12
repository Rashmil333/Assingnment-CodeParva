import { useEffect } from 'react';
import { useState } from 'react';
import { TableData, TableHeaders } from '../../../constant';
import { INDEXDBNEW } from '../../../helpers';
import { CrossIcon } from '../../../static/Svgs';
import styles from './tablecomponent.module.scss';

const TableComponent = ({ close }) => {
    const [selectedNav, setSelectedNav] = useState('dog');
    const [catsdata, setCatsData] = useState();
    useEffect(() => {
        INDEXDBNEW.getData('giveAwayData', 'userData', setCatsData);
    }, []);
    return (
        <div className={styles.tableWrapper}>
            <p className={styles.caption}>What all pets do we have ?</p>
            <div className={styles.tableNav}>
                <p className={`${styles.nav} ${selectedNav === 'dog' ? styles.selected : ''}`} onClick={() => setSelectedNav('dog')}>DOGS</p>
                <div className={styles.vr} />
                <p className={`${styles.nav} ${selectedNav === 'cat' ? styles.selected : ''}`} onClick={() => setSelectedNav('cat')}>CATS</p>
            </div>
            <div className={styles.headers}>
                {TableHeaders.map((item, index) => {
                    return (
                        <p key={index} className={styles.header}>{item.title}</p>
                    )
                })}
            </div>
            <div className={styles.dataMapper}>
                {(selectedNav === 'cat' ? catsdata : TableData).map((item, index) => {
                    return (
                        <div key={index} className={styles.data}>
                            <span className={styles.text}>{item.petType}</span>
                            <span className={styles.text}>{item.breed}</span>
                            <span className={styles.text}>{item.age}</span>
                        </div>
                    )
                })}
            </div>
            <span className={styles.crossicon} onClick={close}><CrossIcon /></span>
        </div>
    )
}

export default TableComponent