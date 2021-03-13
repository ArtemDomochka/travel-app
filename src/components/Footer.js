import styles from './Footer.module.scss'
import React from 'react'
import {Github, Youtube} from 'react-bootstrap-icons'
import RsLogo from '../media/rslogo.png'

const Footer = props => {

    return(
        <footer className="footer mt-auto bg-dark"
            
        >
            <div className="container">
                <a className={styles.icon} href="https://github.com/ArtemDomochka/travel-app/tree/develop" rel="noreferrer" target="_blank">
                    <Github color="white" fontSize="1.75rem"/>
                </a>
                <a className={styles.icon} href="https://github.com/ArtemDomochka/travel-app/tree/develop" rel="noreferrer" target="_blank">
                    <Youtube color="red" fontSize="2rem" className={styles.icon2}/>
                </a>
                <a href="https://rs.school/" rel="noreferrer" target="_blank">
                    <img src={RsLogo} alt="RsLogo" width="70px" className={styles.rsLogo}/>
                </a>
                <span className={styles.year}>2021</span>
            </div>
        </footer>
    )
}

export default Footer