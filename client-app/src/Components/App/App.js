import NavBar from "../NavBar/Navbar";
import "./App.css";
import Login from "../Login/Login";

function App(props) {
    return (
        <div className="App">
            {props.loggedInUser !== null && (
                <div>
                    <label name="loggedInUser">{"Logged in user: " + props.loggedInUser}</label>
                    <NavBar />
                </div>
            )}
            {props.loggedInUser === null && <Login />}
        </div>
    );
}

export default App;
