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
import SpotDetailsView from "./views/SpotDetailsView";
import UserProfileView from "./views/UserProfileView";
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
          <Route path="spotdetails/:spot" element={<SpotDetailsView />} />
          <Route path="profile" element={<UserProfileView />} />
        </Routes>
      </AutenticationContextProvider>
    </div>
  );
}

export default App;
