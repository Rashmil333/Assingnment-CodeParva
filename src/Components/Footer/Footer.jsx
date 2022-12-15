import React from 'react';
import { ContactData, FooterData, FooterLinks, Links, TermsAndConditionsData } from '../../constant';
import WindowSize from '../../Hooks/WindowSize';
import { SvgLogo } from '../../static/Svgs';
import Button from '../Button/Button';
import styles from './footer.module.scss';

const Footer = () => {
    const screenSize = WindowSize();
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerMain}>
                <div className={styles.left}>
                    <div className={styles.banner}>
                        {<SvgLogo />}
                        <p className={styles.bannerTitle}>ANIMAL SHELTER</p>
                    </div>
                    <p className={styles.desc}>{FooterData.desc}</p>
                    <Button title="Adopt" varient='footer' showArrow />
                </div>
                <div className={styles.middle}>
                    <p className={styles.heading}>GET IN TOUCH</p>
                    {ContactData.map((item, index) => {
                        return (
                            <div className={styles.contact} key={index}>
                                {item.icon}
                                <p className={styles.contactdesc}>{item.desc}</p>
                            </div>
                        )
                    })}
                    <p className={`${styles.heading}`}>FOLLOW US</p>
                    {FooterLinks.map((link, index) => {
                        return (
                            <span key={index} className={styles.link}>{link.element}</span>
                        )
                    })}
                </div>
                <div className={styles.last}>
                    <p className={styles.lastTitle}>QUICK LINKS</p>
                    {Links.map((link, index) => {
                        return (
                            <p key={index} className={styles.link}>{link.title}</p>
                        )
                    })}
                </div>
            </div>
            <div className={styles.termsAndConditions}>
                <p className={styles.text}>Copyright ©2023. Animal Shelter</p>
                {screenSize.width > 480 ? (
                    <div className={styles.rightSec}>
                        {TermsAndConditionsData.map((item, index) => {
                            return (
                                <p className={styles.conditions} key={index}>{item.title}</p>
                            )
                        })}
                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default Footer
