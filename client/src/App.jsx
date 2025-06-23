import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import MainPageAdmin from "./pages/mainPageAdmin";
import ResultsPage from "./pages/resultsPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Navigate to='/login' />}
                />
                <Route
                    path='/login'
                    element={<LoginPage />}
                />
                <Route
                    path='/register'
                    element={<RegisterPage />}
                />
                <Route
                    path='/register/admin'
                    element={<RegisterPage />}
                />
                <Route
                    path='/mainPageAdmin'
                    element={<MainPageAdmin />}
                />
                <Route
                    path='/results'
                    element={<ResultsPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}
