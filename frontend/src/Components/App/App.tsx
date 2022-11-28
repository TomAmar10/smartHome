import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { login } from "../../store/user-state";
import Header from "./1-Header/Header";
import Main from "./4-Main/Main";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
