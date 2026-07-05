import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../video/Layout";
import SearchPage from "../video/SearchPage";
import FavoritesPage from "../video/FavoritesPage";
import PrivateRouter from "../features/auth/PrivateRouter";
// import TestApi from "../assets/TestApi";

function App() {
  return (
    <div className="container">
      <Routes>
      {/* Публичные маршруты */}
      <Route index element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Защищенные маршруты с вашим PrivateRouter */}
      <Route element={<PrivateRouter />}>
        <Route element={<Layout />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Route>

      {/* 404 / Редирект */}
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
      {/* <TestApi/> */}
    </div>
  );
}

export default App;
