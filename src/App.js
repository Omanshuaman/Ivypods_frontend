import "./App.css";

import { Route } from "react-router-dom";
import Map from "./pages/Map";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Map} exact />
    </div>
  );
}

export default App;
