import styles from './HeaderSection.module.css';

const HeaderSection = () => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <ul className={styles.logo}>
                        <li><img src="" alt="logo" /></li>
                        <li><a href="">Search</a></li>
                    </ul>
                    <a href=""><img src="" alt="account" /></a>
                </nav>
                <div className={styles.overlay}></div>
                <img src="./img/oshinoko.jpg" alt="hero_img" className={styles.heroImage} />
                <div className={styles.welcome}>
                    <h1>Welcome to OhMovie!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> <br /> Vero qui earum voluptates voluptas, ipsa cupiditate ut deserunt sint, iste tempore consequatur! Mollitia corporis voluptas inventore dolores tempore at facere laudantium?</p>
                </div>
            </header>
        </>
    );
}

export default HeaderSection;