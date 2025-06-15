import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "../../pages/HomePage";
import MyPetsPage from "../../pages/MyPetsPage";
import ComingSoonPage from "../../pages/ComingSoonPage";

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route
          path="/recipes"
          element={
            <ComingSoonPage
              title="Recipe Generator"
              emoji="🍽️"
              description="Discover personalised recipes tailored for your pets' specific needs"
            />
          }
        />
        <Route
          path="/about"
          element={
            <ComingSoonPage
              title="About PawfectBite"
              emoji="🐾"
              description="Learn more about our mission to create healthy, delicious meals for your furry friends"
            />
          }
        />
      </Routes>
    </>
  )
}

export default App;
