import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Favorite from "./pages/favorite/Favorite";
import Details from "./pages/details/Details";
import Navbar from "./pages/navbar";
import Loading from "./pages/loading";
import { useContext } from "react";
import { GlobalContext } from "./context/context";
function App() {
  const { pending } = useContext(GlobalContext);
  return (
    <>
      <Navbar />
      <div className="container px-4 mt-3">
        <Routes>
          <Route path="/" element={pending ? <Loading /> : <Home />} />
          <Route
            path="/favorite"
            element={pending ? <Loading /> : <Favorite />}
          />
          <Route
            path="/recipe-id/:id"
            element={pending ? <Loading /> : <Details />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
