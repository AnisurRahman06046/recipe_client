"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DetailsPage = () => {
  const id = useSearchParams().get("id");
  const [recipeDetails, setRecipeDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/recipe/single-recipe/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch recipe details.');
        }

        const data = await res.json();
        setRecipeDetails(data.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error.message);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/recipe/remove-recipe/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete recipe.');
      }

      // Redirect to the home page after successful deletion
      router.push('/');
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  if (!recipeDetails) {
    return <div className="text-center mt-8 text-white">Loading...</div>;
  }

  const { title, description, ingredients, instruction, imageUrl } = recipeDetails;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <p className="mb-4"><span className="font-bold text-gray-300">Description:</span> {description}</p>
      <p className="mb-2 font-bold text-gray-300">Ingredients:</p>
      <ol className="list-decimal pl-6 mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ol>
      <p className="mb-4"><span className="font-bold text-gray-300">Instructions:</span> {instruction}</p>

      {/* Add Edit button with Link to navigate to the edit page */}
      <Link className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" href={{pathname:"/edit", query:{id:`${id}`}}}>
      
          Edit
   
      </Link>

      <button
        onClick={handleDelete}
        className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800"
      >
        Delete
      </button>
    </div>
  );
};

export default DetailsPage;
