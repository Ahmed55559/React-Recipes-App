import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import { NavLink } from "react-router-dom";
export default function Home() {
  const { searchResults } = useContext(GlobalContext);

  return (
    <div>
      <h1 className="text-4xl p-1.5">Home page</h1>
      <div className="content mt-10 gap-5 columns-1 md:columns-2 lg:columns-4 xl:columns-5">
        {searchResults &&
        searchResults.recipes &&
        searchResults.recipes.length ? (
          searchResults.recipes.map((recipe) => (
            <div
              className="card max-w-full md:w-96 shadow-sm inline-block mt-5"
              key={recipe?.recipe_id}
            >
              <figure>
                <img
                  src={recipe?.image_url}
                  alt={recipe?.title}
                  className="w-full"
                />
              </figure>
              <div className="card-body bg-[#1c1c1c] rounded-b-xl max-h-fit">
                <h2 className="card-title">{recipe?.title}</h2>
                <div>
                  publisher :
                  <span className="badge badge-outline badge-success ml-1">
                    {recipe?.publisher}
                  </span>
                </div>
                <div>
                  social rank :
                  <span className="badge badge-outline badge-warning ml-1">
                    {Math.trunc(recipe?.social_rank)}
                  </span>
                </div>
                <div className="card-actions justify-end">
                  <NavLink
                    to={`/recipe-id/${recipe?.recipe_id}`}
                    className="btn btn-soft btn-success"
                  >
                    Details
                  </NavLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl">Search for Recipes </div>
        )}
      </div>
    </div>
  );
}
