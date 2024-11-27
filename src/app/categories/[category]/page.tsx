import Link from "next/link";

const page = ({ params }: { params: { category: string } }) => {
  const recipes = ["chocolate-cake", "apple-pie"];

  return (
    <div>
      <h1>Recipes in {params.category}</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe}>
            <Link href={`/categories/${params.category}/${recipe}`}>
              {recipe}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
