export const RecentActivityItem = (props: {
  type: string;
  recipe: string;
  rating?: number;
  time: string;
}) => {
  return (
    <li className="text-sm">
      <div>
        {props.type === "comment" && "Commented on"}
        {props.type === "rating" && "Rated"}
        {props.type === "view" && "Viewed"}
        {props.type === "save" && "Saved"}
        {/* */ " "}
        {props.recipe} {props.type === "rating" && props.rating + " stars"}
      </div>
      <div>
        <span className="text-muted-foreground">{props.time}</span>
      </div>
    </li>
  );
};
