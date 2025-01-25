import { Card, CardHeader } from "../ui/card";

//TODO - it's only for my current purpouses, we will delete this shit interface
interface MyMenuElementProps {
  recipe:
    | {
        id: number;
        name: string;
      }
    | {
        id: number;
        name: string;
        recipes: {
          id: number;
          name: string;
        }[];
      };
  index: number;
}

const MyMenuElement = ({ recipe, index }: MyMenuElementProps) => {
  return (
    <>
      <Card className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
        <CardHeader>{recipe.name}</CardHeader>
      </Card>
    </>
  );
};
export { MyMenuElement };
