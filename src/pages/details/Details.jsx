import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/context";
import { useParams } from "react-router-dom";
export default function Details() {
  const params = useParams();
  const { id } = params;
  const { handleToggleFavorites, favList } = useContext(GlobalContext);
  const [recipe, setRecipe] = useState(null);

  async function getTheRecipe() {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const recipe = await res.json();

    setRecipe(recipe.recipe);
  }

  useEffect(() => getTheRecipe, [id]);
  return (
    <div>
      <h1 className="text-4xl p-1.5">Details page</h1>
      {recipe ? (
        <div className="content mt-10">
          <div className="card lg:card-side bg-[#1c1c1c] shadow-sm">
            <figure>
              <img src={recipe?.image_url} alt={recipe?.title} />
            </figure>
            <div className="card-body ">
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

              <div className="text-md">
                <h4 className="text-lg mb-3 mt-5"> Ingredients:</h4>
                {recipe && recipe.ingredients
                  ? recipe.ingredients.map((item, index) => (
                      <p key={index} className="mx-1 text-md">
                        {item}
                      </p>
                    ))
                  : null}
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn bg-red-500 border-red-500 text-white"
                  onClick={() => handleToggleFavorites(recipe)}
                >
                  {favList &&
                  favList.length > 0 &&
                  favList.findIndex(
                    (fav) => fav.recipe_id === recipe.recipe_id
                  ) !== -1
                    ? "Remove from favorites"
                    : "Add to favorites"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="size-[1.2em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
