import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CreatedRecipesCard = (props: any) => {
  return (
    <Card className="h-64 w-64">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1">
          {props.tags.map((tag: any) => (
            <span
              key={tag}
              className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-slate-600">{props.description}</CardFooter>
    </Card>
  );
};
