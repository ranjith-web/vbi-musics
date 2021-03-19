import LeftNav from './leftNav';
import RightNavLoggedIn from './rightNavLoggedIn';
import './styles.css';

const NavBar = () => {

    return (
        // <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //     Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //     className="App-link"
        //     href="https://reactjs.org"
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     >
        //     Learn React
        //     </a>
        // </header>
        <section className="nav">
            <ul className="main-nav">
            <LeftNav />
            <RightNavLoggedIn />
            </ul>

            {/* <Modal isOpen={this.state.modal}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Modal"
            style={modalStyle}>

            <SessionFormContainer
                closeModal={this.closeModal.bind(this)}
                formType={this.state.formType} />
            </Modal> */}
        </section>
    )
}

export default NavBar;