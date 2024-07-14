import React from 'react';
import styles from './FooterSection.module.css';

const FooterSection = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Cosetto. All rights reserved.
            </div>
        </footer>
    );
}

export default FooterSection;
