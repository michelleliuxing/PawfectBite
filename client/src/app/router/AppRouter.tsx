import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import MyPetsPage from "../../pages/MyPetsPage";
import RecipesPage from "../../pages/RecipesPage";
import AboutPage from "../../pages/AboutPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-pets" element={<MyPetsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
} 