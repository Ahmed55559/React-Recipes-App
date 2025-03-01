import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [pending, setPending] = useState(false);
  const [favList, setFavList] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setPending(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${searchParam}`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
      navigate("/");
    }
  }

  function handleToggleFavorites(getCurrentItem) {
    const cpyFavList = [...favList];
    const index = cpyFavList.findIndex(
      (item) => item.recipe_id === getCurrentItem.recipe_id
    );
    if (index === -1) {
      cpyFavList.push(getCurrentItem);
    } else {
      cpyFavList.splice(index, 1);
    }
    setIsFav(
      cpyFavList.some((item) => item.recipe_id === getCurrentItem.recipe_id)
    );
    setFavList(cpyFavList);
    setIsFav(!isFav);
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        pending,
        searchResults,
        handleToggleFavorites,
        isFav,
        favList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
