import MainNavbar from "./navigation/MainNavbar";
import MainSpotListView from "./views/MainSpotListView";
import { Route, Routes } from "react-router-dom";
import MainWelcomeView from "./views/MainWelcomeView";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Routes>
        <Route path="home" element={<MainSpotListView />} />
        <Route path="/" element={<MainWelcomeView />} />
      </Routes>
    </div>
  );
}

export default App;
