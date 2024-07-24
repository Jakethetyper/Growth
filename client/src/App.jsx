import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./pages/Header/Header";
import Profile from "./pages/Profile/Profile";

function AppRoutes() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
