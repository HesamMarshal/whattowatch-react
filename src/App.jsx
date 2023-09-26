import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import WatchOffer from "./components/WatchOffer";
import NewMoviesList from "./components/NewMoviesList";
import NewSeriesList from "./components/NewSeriesList";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <WatchOffer />
      <NewMoviesList />
      <NewSeriesList />
      <Footer />
    </>
  );
}

export default App;
