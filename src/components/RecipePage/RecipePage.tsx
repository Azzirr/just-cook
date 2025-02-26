import { RecipeSteps } from "./RecipeSteps";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeActions } from "./RecipeActions";

const pizzaRecipe = {
  name: "Easy Homemade Pizza",
  author: "Sally",
  createdAt: "2013-09-01",
  updatedAt: "2022-06-10",
  description: `Follow these basic instructions for a thick, crisp, and chewy pizza crust at home. 
  The recipe yields enough pizza dough for two 12-inch pizzas and you can freeze half of the dough for later. 
  Close to 2 pounds of dough total.`,
  ingredients: [
    {
      id: 0,
      name: "Warm water",
      quantity: "320ml",
      notes: "between 38 and 46°C",
    },
    {
      id: 1,
      name: "Instant yeast",
      quantity: "7g",
      notes: "1 standard packet",
    },
    {
      id: 2,
      name: "Granulated sugar",
      quantity: "1 tablespoon",
    },
    {
      id: 3,
      name: "Olive oil",
      quantity: "2 tablespoons",
      notes: "plus more for pan and brushing on dough",
    },
    {
      id: 4,
      name: "Salt",
      quantity: "1 teaspoon",
    },
    {
      id: 5,
      name: "Unbleached all-purpose flour",
      quantity: "450g",
    },
  ],
  steps: [
    "Whisk the warm water, yeast, and granulated sugar together in the bowl of your stand mixer fitted with a dough hook or paddle attachment. Cover and allow to rest for 5 minutes",
    "Add olive oil, salt, and flour. Mix until combined.",
    "Knead the dough on a floured surface for 5 minutes.",
    "Place dough in a greased bowl, cover with a towel. Allow the dough to rise at room temperature for 60-90 minutes or until double in size",
    "Preheat oven to 246°C.",
    "Punch down dough and divide in half.",
    "Roll out dough on a floured surface to desired thickness.",
    "Place dough on a greased baking sheet or pizza pan.",
    "Top with desired toppings",
    "Bake for 13-15 minutes or until the crust is golden brown",
  ],
};

export const RecipePage = (user: any) => {
  return (
    <div className="mx-auto flex max-w-[80ch] flex-col gap-3 p-6">
      <section className="flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <h1>{pizzaRecipe.name}</h1>
          <p>by {pizzaRecipe.author}</p>
        </div>
        <div className="mb-2 sm:mt-2">
          <p className="mb-1 text-sm text-muted-foreground">
            Created {pizzaRecipe.createdAt}
          </p>
          <p className="text-sm text-muted-foreground">
            Updated {pizzaRecipe.updatedAt}
          </p>
        </div>
      </section>
      <RecipeActions user={user} />
      <section>
        <p>{pizzaRecipe.description}</p>
      </section>
      <RecipeIngredients ingredients={pizzaRecipe.ingredients} />
      <RecipeSteps steps={pizzaRecipe.steps} />
    </div>
  );
};
