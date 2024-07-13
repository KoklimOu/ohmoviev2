import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon  } from '@fortawesome/free-solid-svg-icons';
import styles from './HeaderSection.module.css';
import  Switch  from "../../conponents/Switch";

const HeaderSection = () => {


    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
        localStorage.setItem("selectedTheme", "dark");
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light");
    }

    const seletedTheme = localStorage.getItem("selectedTheme");
    seletedTheme === "dark" ? setDarkMode():setLightMode();

    const toggleMode = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    } 

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <ul className={styles.logo}>
                        <li><a href="">OhMovie!</a></li>
                        <li><a href="">Search</a></li>
                    </ul>
                    <div className={styles.mode} onClick={toggleMode}>
                        <FontAwesomeIcon className={styles.modeIcon} icon={faSun} title='light'/>
                        <Switch isOn={seletedTheme === "dark"} handleToggle={toggleMode}/>
                        <FontAwesomeIcon className={styles.modeIcon} icon={faMoon} title='night'/>
                    </div>
                </nav>
                <div className={styles.overlay}></div>
                <img src="./img/oshinoko.jpg" alt="hero_img" className={styles.heroImage} />
                <div className={styles.welcome}>
                    <h1>Welcome to OhMovie!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> <br /> Vero qui earum voluptates voluptas, ipsa cupiditate ut deserunt sint, iste tempore consequatur! Mollitia corporis voluptas inventore dolores tempore at facere laudantium?</p>
                </div>
            </header>

            <div className='sectionSeparator'></div>
        </>
    );
}

export default HeaderSection;