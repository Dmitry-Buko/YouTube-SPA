import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRouter from "../features/auth/PrivateRouter";
import Layout from "../pages/Layout";
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const SearchPage = lazy(() => import("../video/SearchPage"));
const FavoritesPage = lazy(() => import("../video/FavoritesPage"));



function App() {
  return (
    <div className="container">
      <Routes>
        <Route index element={<Navigate to="/register" replace />} />
        <Route path="/register" element={
          <Suspense fallback={<div className="loading">Загрузка страницы регистрации...</div>}>
            <Register />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<div className="loading">Загрузка страницы входа...</div>}>
            <Login />
          </Suspense>
        } />

        <Route element={<PrivateRouter />}>
          <Route element={<Layout />}>
            <Route path="/search" element={
              <Suspense fallback={<div className="loading">Загрузка поиска...</div>}>
                <SearchPage />
              </Suspense>
            } />
            <Route path="/favorites" element={
              <Suspense fallback={<div className="loading">Загрузка избранного...</div>}>
                <FavoritesPage />
              </Suspense>
            } />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </div>
  );
}

export default App;
