import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Home/HomePage";

import Search from "./pages/Search";
import ReleaseNotes from "./pages/ReleaseNotes";
import NewMoviesList from "./components/NewMoviesList";
import Movie from "./pages/MoviePage/Movie";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search" element={<Search />} />
        <Route path="/release" element={<ReleaseNotes />} />
        <Route path="/newMovieList" element={<NewMoviesList />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
