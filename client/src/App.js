import MainNavbar from "./navigation/MainNavbar";
import MainSpotListView from "./views/MainSpotListView";
import { Route, Routes } from "react-router-dom";
import MainWelcomeView from "./views/MainWelcomeView";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";
import AutenticationContext, {
  AutenticationContextProvider,
} from "./context/AutenticationContext";
import AddSpotView from "./views/AddSpotView";

function App() {
  return (
    <div className="App">
      <AutenticationContextProvider>
        <MainNavbar />
        <Routes>
          <Route path="home" element={<MainSpotListView />} />
          <Route path="/" element={<MainWelcomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="signup" element={<SignupView />} />
          <Route path="addspot" element={<AddSpotView />} />
        </Routes>
      </AutenticationContextProvider>
    </div>
  );
}

export default App;
