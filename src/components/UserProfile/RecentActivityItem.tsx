export const RecentActivityItem = ({
  type: activityType,
  recipe: recipeTitle,
  rating,
  time: timeOfActivity,
}: {
  type: string;
  recipe: string;
  rating?: number;
  time: string;
}) => {
  return (
    <li className="text-sm">
      <div>
        {activityType === "comment" && "Commented on"}
        {activityType === "rating" && "Rated"}
        {activityType === "view" && "Viewed"}
        {activityType === "save" && "Saved"}
        {/* */ " "}
        {recipeTitle} {activityType === "rating" && rating + " stars"}
      </div>
      <div>
        <span className="text-muted-foreground">{timeOfActivity}</span>
      </div>
    </li>
  );
};
