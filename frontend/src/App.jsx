import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingleMovie from "./pages/SingleMovie";
import Movies from "./pages/Movies";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import WatchList from "./pages/Watchlist";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Footer from "./components/Footer";

function App() {
  const user = useSelector((state) => state.user?.currentUser?.user);
  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            color: "#000000",
            backgroundColor: "#1f80e0",
          },
          error: {
            style: {
              backgroundColor: "#ffcccc",
            },
          },
        }}
      />
      <Header />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Movies />} />
        <Route path="/:media_type/:id" element={<SingleMovie />} />
        <Route path="/myWatchlist" element={<WatchList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
