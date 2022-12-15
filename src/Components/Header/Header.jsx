import React from 'react'
import { Links, SocialLinks } from '../../constant';
import WindowSize from '../../Hooks/WindowSize';
import { SvgLogo, SvgNavigator } from '../../static/Svgs';
import styles from './header.module.scss';
const Header = () => {
    const screenSize = WindowSize();
    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftSection}>
                <SvgLogo />
                <p className={styles.title}>Animal Shelter</p>
            </div>
            {screenSize.width > 1024 ? (
                <>
                    <div className={styles.links}>
                        {Links.map((link, index) => {
                            return (
                                <p key={index} className={styles.link}>{link.title}</p>
                            )
                        })}
                    </div>
                    <div className={styles.socialLinks}>
                        {SocialLinks.map((link, index) => {
                            return (
                                <span key={index} className={styles.socialLinksSvg}>{link.element}</span>
                            )
                        })}
                    </div>
                </>
            ) : (
                <span className={styles.navigator}>{<SvgNavigator />}</span>
            )}

        </div>
    )
}

export default Header