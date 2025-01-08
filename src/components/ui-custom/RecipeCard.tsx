import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type RecipeCardProps = {
  name: string;
  id: number;
  description: string;
  tags: string[];
  // image: string;
};

export const RecipeCard = (props: RecipeCardProps) => {
  return (
    <Card className="h-64 w-60">
      <CardHeader>
        <CardTitle className="text-2xl">{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1">
          {props.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground">
        {props.description}
      </CardFooter>
    </Card>
  );
};
