import Link from "next/link";

const RecipeCard = ({ id, title }) => {
  return (
    <div className="flex-shrink-0 max-w-sm rounded overflow-hidden shadow-lg bg-white text-black mr-4 mb-4">
      <Link href={{ pathname: `/details`, query: { id: `${id}` } }}>
        <div className="relative h-48 overflow-hidden w-full">
          <img
            className="w-full h-full object-cover object-center"
            src="https://via.placeholder.com/300" // Placeholder image URL
            alt={title}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
