// "use client"

// import Link from "next/link"

// function NavBar() {
//   return (
//     <nav>
//       <Link href="/create">Create Recipe</Link>
//       {/*href={{pathname:"/edit", query:{id:"1"}}} <Link>Details</Link> */}
//     </nav>
//   )
// }

// export default NavBar

// "use client";
// import Link from "next/link";

// function NavBar() {
//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link className="text-white font-bold text-xl" href="/">
//           Home
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link className="text-white hover:text-gray-300" href="/create">
//             Create Recipe
//           </Link>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;

"use client";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-center gap-10">
        <Link
          className="text-white font-bold text-xl hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-white font-bold hover:text-gray-300"
          href="/create"
        >
          Create Recipe
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
