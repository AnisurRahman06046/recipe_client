"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ingredientsList from "../../../../ingredients.json";
import { useState, useEffect } from "react";
import Select from "react-select";

// EditRecipe component
const EditRecipe = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");

  // Get recipe ID from query params
  const id = useSearchParams().get("id");
  const router = useRouter();

  // Fetch initial recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/recipe/single-recipe/${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch recipe details.");
        }

        const data = await res.json();
        const { title, ingredients, instruction, description } = data.data;

        // Set initial values
        setTitle(title);
        setSelectedIngredients(
          ingredients.map((ingredient) => ({ value: ingredient, label: ingredient }))
        );
        setInstructions(instruction);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching recipe details:", error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/recipe/edit-recipe/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            ingredients: selectedIngredients.map(
              (ingredient) => ingredient.value
            ),
            instruction: instructions,
            description,
            imageUrl: "https://example.com/spaghetti_bolognese.jpg",
          }),
        }
      );

      if (!response.ok) {
        // Handle non-successful response
        const errorData = await response.json();
        console.error("Error response:", response.status, errorData);
        throw new Error("Failed to create recipe.");
      }

      const responseData = await response.json();
      console.log(responseData);

      // Clear the form after successful submission
      setTitle("");
      setSelectedIngredients([]);
      setInstructions("");
      setDescription("");
      router.push("/");
    } catch (error) {
      console.error("Error adding recipe:", error.message);
    }
  };

  // Handle ingredient selection
  const handleChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions);
  };

  // Map ingredientsList to options format
  const options = ingredientsList.map((ingredient) => ({
    value: ingredient.label,
    label: ingredient.label,
  }));

  // Render the component
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Title:
      </label>
      <input
        type="text"
        value={title}
        readOnly
        disabled // Make the input readonly
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
        Ingredients:
      </label>
      <Select
        isMulti
        options={options}
        value={selectedIngredients}
        onChange={handleChange}
        className="w-full text-gray-800"
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "black",
          }),
        }}
      />

      <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
        Instructions:
      </label>
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
        Description:
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
      />

      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Update Recipe
      </button>
    </form>
  );
};


export default EditRecipe;
