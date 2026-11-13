import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./modules/dashboard/DashboardPage";
import NewOrderService from "./modules/new_order_service";
import Login from "./modules/login/LoginPage";
import VehicleListPage from "./modules/vehicle_list/VehicleListPage";

export function PrivateRoute() {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-order" element={<NewOrderService />} />
          <Route path="/vehicle-list" element={<VehicleListPage />} />
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
