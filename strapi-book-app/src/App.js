// src/App.js
import "./index.css"; // Import global styles
import "./App.css";
import "./pages/home.css"; // Import home styles
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Header from "./components/Header";
import Footer from './components/footer';
import Search from "./pages/Search";
import Login from "./pages/Login"; // Import login page
import Register from "./pages/Register"; // Import register page
import Profile from "./pages/Profile"; // Import profile page
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute component
import { useState, useEffect } from "react";
import { fetchThemeSettings } from "./api"; // Import fetchThemeSettings from api.js

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [theme, setTheme] = useState(""); // Start with an empty value
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const getThemeSettings = async () => {
      try {
        const response = await fetchThemeSettings();
        console.log(response.data); // Check response
        const fetchedTheme = response.data.data.attributes.Theme.toLowerCase();
        console.log("Fetched theme:", fetchedTheme); // Check fetched theme
        setTheme(fetchedTheme); // Set theme from API and make it lowercase
      } catch (error) {
        console.error("Error fetching theme settings:", error);
        setTheme("original"); // Set a fallback theme on error
      }
    };

    getThemeSettings();
  }, []); // Run when the component loads

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!theme) return <div>Loading...</div>; // Show loading while theme is fetched

  return (
    <div className={`App ${theme}`}>
      {" "}
      {/* Use the theme as a CSS class */}
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" exact element={<Home user={user} />} />
        <Route path="/detail/:id" element={<BookDetail user={user} />} />
        <Route
          path="/search/:query"
          element={<Search searchValue={searchValue} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />{" "}
        {/* Add login page */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Add register page */}
        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile user={user} />
            </PrivateRoute>
          }
        />{" "}
        {/* Add profile page */}
        
      </Routes>
      <Footer /> {/* Lägg till Footer-komponenten */}
    </div>
  );
}

export default App;
