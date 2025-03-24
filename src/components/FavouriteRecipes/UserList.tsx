import { Recipe, RecipeList } from "@prisma/client";
import { Card, CardHeader } from "../ui/card";

//TODO - it's only for my current purpouses, we will delete this shit interface
interface UserListProps {
  recipe: RecipeList | Recipe;
  index: number;
}

const UserList = ({ recipe, index }: UserListProps) => {
  return (
    <>
      <Card className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
        <CardHeader>{recipe.name}</CardHeader>
      </Card>
    </>
  );
};
export { UserList };
