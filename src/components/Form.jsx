"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import ingredientsList from "../../ingredients.json";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    selectedIngredients: [],
    instructions: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/recipe/create-recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            ingredients: formData.selectedIngredients.map(
              (ingredient) => ingredient.value
            ),
            instruction: formData.instructions,
            description: formData.description,
            imageUrl: "https://example.com/spaghetti_bolognese.jpg",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", response.status, errorData);
        throw new Error("Failed to create recipe.");
      }

      const responseData = await response.json();
      console.log(responseData);

      setFormData({
        title: "",
        selectedIngredients: [],
        instructions: "",
        description: "",
      });

      router.push("/");
    } catch (error) {
      console.error("Error adding recipe:", error.message);
      // Display an error message to the user
    }
  };

  const options = ingredientsList.map((ingredient) => ({
    value: ingredient.label,
    label: ingredient.label,
  }));

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      {/* Input components can be separate */}
      <TextInput
        label="Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      {/* Select component can be separate */}
      <SelectInput
        label="Ingredients"
        options={options}
        value={formData.selectedIngredients}
        onChange={(selectedOptions) =>
          handleChange("selectedIngredients", selectedOptions)
        }
      />

      {/* TextArea components can be separate */}
      <TextAreaInput
        label="Instructions"
        value={formData.instructions}
        onChange={(e) => handleChange("instructions", e.target.value)}
      />
      <TextAreaInput
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* Button component can be separate */}
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Add Recipe
      </button>
    </form>
  );
};

// Separate Input components for better organization
const TextInput = ({ label, value, onChange }) => (
  <>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}:
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
    />
  </>
);

const SelectInput = ({ label, options, value, onChange }) => (
  <>
    <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
      {label}:
    </label>
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      className="w-full text-gray-800"
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? "white" : "black",
        }),
      }}
    />
  </>
);

const TextAreaInput = ({ label, value, onChange }) => (
  <>
    <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
      {label}:
    </label>
    <textarea
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
    />
  </>
);

export default RecipeForm;
