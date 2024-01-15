// // "use client";

// // import RecipeCard from "@/components/cardList";
// // import { useEffect, useState } from "react";

// // function ViewPage() {
// //   const [recipeList, setRecipeList] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await fetch(
// //           "http://localhost:5000/api/v1/recipe/recipe-list"
// //         );
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch recipe list.");
// //         }

// //         const data = await res.json();
// //         console.log(data.data);
// //         setRecipeList(data.data);
// //       } catch (error) {
// //         console.error("Error fetching recipe list:", error.message);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <section className="flex flex-wrap justify-center">
// //       <h1 className="text-center">Recipe Lists</h1>
// //       <div className="flex justify-center items-center mt-36">
// //         {recipeList.map((recipe) => (
// //           <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // export default ViewPage;


// // Importing necessary modules and components
// "use client";
// import RecipeCard from "@/components/cardList";
// import { useEffect, useState } from "react";

// // ViewPage component
// function ViewPage() {
//   // State to store the list of recipes
//   const [recipeList, setRecipeList] = useState([]);

//   // Fetching data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/v1/recipe/recipe-list"
//         );
//         if (!res.ok) {
//           throw new Error("Failed to fetch recipe list.");
//         }

//         const data = await res.json();
//         setRecipeList(data.data);
//       } catch (error) {
//         console.error("Error fetching recipe list:", error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   // Rendering the component
//   return (
//     <section className="container mx-auto my-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Recipe Lists</h1>
//       <div className="flex flex-wrap justify-center">
//         {recipeList.map((recipe) => (
//           <RecipeCard
//             key={recipe.id}
//             id={recipe.id}
//             title={recipe.title}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// // Exporting the component
// export default ViewPage;


// Importing necessary modules and components
"use client";
import RecipeCard from "@/components/cardList";
import { useEffect, useState } from "react";

// ViewPage component
function ViewPage() {
  // State to store the list of recipes
  const [recipeList, setRecipeList] = useState([]);

  // Fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/recipe/recipe-list"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch recipe list.");
        }

        const data = await res.json();
        setRecipeList(data.data);
      } catch (error) {
        console.error("Error fetching recipe list:", error.message);
      }
    };

    fetchData();
  }, []);

  // Rendering the component
  return (
    <section className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Lists</h1>
      {recipeList.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {recipeList.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          <p>No recipes available.</p>
          <p className="mt-4">Start adding your favorite recipes!</p>
        </div>
      )}
    </section>
  );
}

// Exporting the component
export default ViewPage;
