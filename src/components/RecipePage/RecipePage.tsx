import { Checkbox } from "@/components/ui/checkbox";

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
      name: "Warm water",
      quantity: "320ml",
      notes: "between 38 and 46°C",
    },
    {
      name: "Instant yeast",
      quantity: "7g",
      notes: "1 standard packet",
    },
    {
      name: "Granulated sugar",
      quantity: "1 tablespoon",
    },
    {
      name: "Olive oil",
      quantity: "2 tablespoons",
      notes: "plus more for pan and brushing on dough",
    },
    {
      name: "Salt",
      quantity: "1 teaspoon",
    },
    {
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

export const RecipePage = () => {
  return (
    <div className="mx-auto flex max-w-[80ch] flex-col gap-6 p-6">
      <section className="flex justify-between gap-3">
        <div>
          <h1>{pizzaRecipe.name}</h1>
          <p>by {pizzaRecipe.author}</p>
        </div>
        <div className="mt-2">
          <p className="mb-1 text-sm">Created {pizzaRecipe.createdAt}</p>
          <p className="text-sm">Updated {pizzaRecipe.updatedAt}</p>
        </div>
      </section>
      <section>
        <p>{pizzaRecipe.description}</p>
      </section>
      <section>
        <h2 className="mb-2">Ingredients</h2>
        <ul className="flex flex-col items-start gap-1">
          {pizzaRecipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              <label className="flex cursor-pointer gap-2">
                <Checkbox className="peer mt-1" />
                <span className="peer-aria-checked:line-through">
                  <span className="text-semibold">{ingredient.name}</span> -{" "}
                  {ingredient.quantity}{" "}
                  {ingredient.notes && `(${ingredient.notes})`}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2">Steps</h2>
        <ol className="list-inside list-decimal marker:text-lg marker:font-bold">
          {pizzaRecipe.steps.map((step, index) => (
            <li key={index} className="mb-2 pl-5 -indent-5">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
