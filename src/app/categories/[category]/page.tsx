import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = ({ params }: { params: { category: string } }) => {
  const recipes = ["chocolate-cake", "apple-pie"];

  return (
    <div>
      <h1>Recipes in {params.category}</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe}>
            <Button>
              <Link href={`/categories/${params.category}/${recipe}`}>
                {recipe}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
