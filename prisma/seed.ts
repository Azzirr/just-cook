//TODO - add npx prisma db seed command to docs

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedingDatabase() {
  console.log("Seeding database in progress...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      username: "admin",
      password: "hashedpassword123",
      role: "ADMIN",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@user.com" },
    update: {},
    create: {
      email: "user@user.com",
      username: "user",
      password: "hashedpassword123",
      role: "USER",
    },
  });

  const categories = await prisma.recipeCategory.createMany({
    data: [
      { id: 1, name: "Breakfast" },
      { id: 2, name: "American Style" },
      { id: 3, name: "Poland Classics" },
      { id: 4, name: "Asian Style" },
      { id: 5, name: "Italian Style" },
      { id: 6, name: "Desserts" },
      { id: 7, name: "Fast Food" },
      { id: 8, name: "Drinks" },
      { id: 9, name: "30 Minutes Recipes" },
      { id: 10, name: "Fit Recipes" },
      { id: 11, name: "Other" },
    ],
    skipDuplicates: true,
  });

  const tags = await prisma.tag.createMany({
    data: [
      { name: "Vege" },
      { name: "Quick" },
      { name: "Breakfast" },
      { name: "Dinner" },
      { name: "Lunch" },
      { name: "Dessert" },
      { name: "Snack" },
      { name: "Healthy" },
      { name: "Gluten Free" },
      { name: "Dairy Free" },
      { name: "Vegan" },
      { name: "Keto" },
      { name: "Paleo" },
      { name: "One Pot" },
      { name: "Grill" },
      { name: "Oven Baked" },
      { name: "Slow Cooker" },
      { name: "Air Fryer" },
      { name: "Low Carb" },
      { name: "Protein Rich" },
      { name: "Spicy" },
    ],
    skipDuplicates: true,
  });

  const koreanChicken = await prisma.recipe.create({
    data: {
      name: "Korean Chicken",
      description:
        "I really typed this recipe by myself. Try it, because it's the best chicken you can eat on earth.",
      steps: [
        "Cut chicken into medium pieces. They should be not small and not really big.",
        "Place the chicken in a bowl and pour the milk over it. Let it completely cover it. Left it for 20 minutes and go to next step.",
        "Get another bowl for chicken breading and add wheat flour, corn flour (you can use potato flour if you want), salt, black powder and optionally a little bit of monosodium glutamate (MSG). Mix it together.",
        "On a pan pour the honey, ketchup, gochujang paste, garlic, soy sauce. Boil it for 30-60 seconds on small heat to not burn the sauce.",
        "Now get the chicken and add a 1/2 of your chicken breading. Notice to don't pour out the milk! Mix it.",
        "Coat the chicken in the remaining chicken breading.",
        "Heat the oil in tall pot (or pan) to 130-150 Celcius degrees (small heat). ",
        "Toss the chicken in the oil for about 6-7 minutes. Watch to make sure it doesn't burn.",
        "Remove the chicken from the oil and place it on a rack or sieve. Do not place it on paper or a board. The chicken should be on a rack because then it does not steam from the bottom, which makes the breading crispy.",
        "Wait a few minutes for it to cool down a bit, and in the meantime heat the oil to about 180 Celcius degrees (medium heat).",
        "Toss the chicken once again in the oil for about 4-5 minutes. Watch to make sure it doesn't burn.",
        "Once again remove the chicken from the oil and place it on a rack or sieve.",
        "Wait for the oil to drain.",
        "If you have a cold sauce, heat it up slightly. Then add the chicken and mix until all the chicken is covered in the sauce.",
        "You can sprinkle it with chopped nuts, sesame seeds, or even lightly drizzle with mayonnaise for decoration.",
      ],
      images: ["https://example.com/korean-chicken.jpg"],
      visibility: "PUBLIC",
      authorId: admin.id,
      recipeCategoryId: 4,
      ingredients: {
        create: [
          { name: "Chicken breasts or legs", quantity: "600g" },
          { name: "Soy sauce", quantity: "3tbs" },
          { name: "Garlic", quantity: "15g" },
          { name: "Wheat flour", quantity: "150g" },
          { name: "Corn flour", quantity: "150g" },
          { name: "Salt", quantity: "0.5tbsp" },
          { name: "Milk", quantity: "150ml" },
          { name: "Honey", quantity: "100g" },
          { name: "Ketchup", quantity: "110g" },
          { name: "Gochujang Paste", quantity: "1tbs" },
          { name: "Black powder", quantity: "0.5tbsp" },
          { name: "Sunflower oil", quantity: "1l" },
        ],
      },
      tag: {
        connect: [{ id: 1 }, { id: 3 }],
      },
    },
  });

  const spaghettiCarbonara = await prisma.recipe.create({
    data: {
      name: "Spaghetti Carbonara",
      description:
        "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. A comfort food staple.",
      steps: [
        "Boil the spaghetti in salted water according to package instructions.",
        "In a pan, cook pancetta or bacon until crispy.",
        "Whisk together eggs, Parmesan, and black pepper in a bowl.",
        "Once the spaghetti is done, reserve some pasta water, then drain.",
        "Quickly toss the spaghetti in the pan with pancetta and some pasta water.",
        "Remove from heat and stir in the egg mixture, adding more pasta water if necessary to create a creamy sauce.",
        "Serve with extra cheese and black pepper.",
      ],
      images: ["https://example.com/spaghetti-carbonara.jpg"],
      visibility: "PUBLIC",
      authorId: admin.id,
      recipeCategoryId: 5,
      ingredients: {
        create: [
          { name: "Spaghetti", quantity: "200g" },
          { name: "Pancetta or bacon", quantity: "100g" },
          { name: "Eggs", quantity: "3" },
          { name: "Parmesan cheese", quantity: "50g" },
          { name: "Black pepper", quantity: "to taste" },
        ],
      },
      tag: {
        connect: [{ id: 2 }, { id: 5 }],
      },
    },
  });

  const pancakes = await prisma.recipe.create({
    data: {
      name: "Pancakes",
      description:
        "Fluffy, golden-brown pancakes perfect for breakfast. Serve with syrup, fruits, or whipped cream!",
      steps: [
        "In a bowl, whisk together flour, sugar, baking powder, and salt.",
        "In a separate bowl, whisk together milk, eggs, and melted butter.",
        "Make a well in the dry ingredients, then pour in the wet ingredients.",
        "Stir until just combined. Be careful not to overmix, as this will result in dense pancakes.",
        "Heat a non-stick pan over medium heat and lightly grease with butter or oil.",
        "Pour about 1/4 cup of batter onto the pan for each pancake.",
        "Cook for 2-3 minutes on one side, until bubbles appear on the surface.",
        "Flip and cook for another 1-2 minutes until golden brown.",
        "Serve with your favorite toppings, like maple syrup, fresh berries, or whipped cream.",
      ],
      images: ["https://example.com/pancakes.jpg"],
      visibility: "PUBLIC",
      authorId: admin.id,
      recipeCategoryId: 1,
      ingredients: {
        create: [
          { name: "Flour", quantity: "200g" },
          { name: "Sugar", quantity: "2 tbsp" },
          { name: "Baking powder", quantity: "2 tsp" },
          { name: "Salt", quantity: "1/4 tsp" },
          { name: "Milk", quantity: "250ml" },
          { name: "Eggs", quantity: "2" },
          { name: "Butter (melted)", quantity: "30g" },
        ],
      },
      tag: {
        connect: [{ id: 3 }, { id: 5 }],
      },
    },
  });

  console.log("Seeding done! Happy coding my friend!");
}

seedingDatabase()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
