import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import MainPageAdmin from "./pages/mainPageAdmin";
import MainPageUser from "./pages/mainPageUser";
import ResultsPage from "./pages/resultsPage";
import LiveRoomPage from "./pages/liveRoomPage";

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
                    path='/mainPageUser'
                    element={<MainPageUser />}
                />
                <Route
                    path='/results'
                    element={<ResultsPage />}
                />
                <Route
                    path='/live'
                    element={<LiveRoomPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}
