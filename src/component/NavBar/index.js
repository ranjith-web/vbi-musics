import LeftNav from './leftNav';
import RightNavLoggedIn from './rightNavLoggedIn';
import './styles.css';

const NavBar = () => {

    return (
        <section className="nav">
            <ul className="main-nav">
                <LeftNav />
                <RightNavLoggedIn />
            </ul>
        </section>
    )
}

export default NavBar;