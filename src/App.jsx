import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import MyAssets from "./components/MyAssets";
import AssetDetails from "./components/AssetDetails";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./AuthContext";
import Inventory from "./components/Inventory";
import Tickets from "./components/Tickets";
import Chat from './components/Chat'

function PublicRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

const Navbar = () => {
  const getLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "black" : "white",
    fontWeight: "bold",
    backgroundColor: isActive ? "yellow" : "",
    padding: "4px 12px",

    borderRadius: "4px",
  });
  return (
    <>
      <Container className="bg-dark pb-3 pt-3 rounded-bottom-3 flex-shrink-0">
        <NavLink to="/" style={getLinkStyle}>
          Home
        </NavLink>

        <NavLink to="/my-assets" style={getLinkStyle}>
          My Assets
        </NavLink>
        <NavLink to="/inventory" style={getLinkStyle}>
          Inventory
        </NavLink>
      </Container>
      <Outlet />
    </>
  );
};
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/my-assets" element={<MyAssets />}></Route>
              <Route path="/my-assets/:id" element={<AssetDetails />}></Route>
              <Route path="/inventory" element={<Inventory />}></Route>
            </Route>
            <Route path="/my-assets/:id/tickets" element={<Tickets />}></Route>
            <Route path="/chat" element={<Chat />}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
