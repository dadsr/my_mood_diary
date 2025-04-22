import "./App.css";
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./routing/Routing.tsx";
import {Header} from "./components/header/Header.tsx";

function App(){
    return (
        <BrowserRouter>
            <Header/>
            <Routing/>
        </BrowserRouter>
    )
}
export default App;