import reactDom from "react-dom";
import App from "./components/app";

let target = document.querySelector("#result");
reactDom.render(<App />, target);