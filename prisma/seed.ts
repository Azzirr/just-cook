//TODO - add npx prisma db seed command to docs

import { PrismaClient, Unit } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log("Seeding database in progress...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      username: "admin",
      password: await bcrypt.hash("hashedpassword123", 10),
      role: "ADMIN",
      emailVerified: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@user.com" },
    update: {},
    create: {
      email: "user@user.com",
      username: "user",
      password: await bcrypt.hash("hashedpassword123", 10),
      role: "USER",
      emailVerified: true,
    },
  });

  const categories = await prisma.recipeCategory.createMany({
    data: [
      { id: 1, name: "Breakfast 🍳", slug: "breakfast" },
      { id: 2, name: "American Style 🍔", slug: "american-style" },
      { id: 3, name: "Polish Classics 🥟", slug: "polish-classics" },
      { id: 4, name: "Asian Style 🍣", slug: "asian-style" },
      { id: 5, name: "Italian Style 🍕", slug: "italian-style" },
      { id: 6, name: "Desserts 🍰", slug: "desserts" },
      { id: 7, name: "Fast Food 🍟", slug: "fast-food" },
      { id: 8, name: "Drinks 🥤", slug: "drinks" },
      { id: 9, name: "30 Minute Recipes ⏱️", slug: "30-minutes-recipes" },
      { id: 10, name: "Fit Recipes 💪", slug: "fit-recipes" },
      { id: 11, name: "Other 📦", slug: "other" },
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
      slug: "korean-chicken",
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
      images: [
        "https://www.alphafoodie.com/wp-content/uploads/2023/08/Korean-Fried-Chicken-square.jpeg",
      ],
      visibility: "PUBLIC",
      authorId: admin.id,
      categoryId: 4,
      ingredients: {
        create: [
          { name: "Chicken breasts or legs", quantity: 600, unit: Unit.GRAM },
          { name: "Soy sauce", quantity: 3, unit: Unit.TABLESPOON },
          { name: "Garlic", quantity: 15, unit: Unit.GRAM },
          { name: "Wheat flour", quantity: 150, unit: Unit.GRAM },
          { name: "Corn flour", quantity: 150, unit: Unit.GRAM },
          { name: "Salt", quantity: 0.5, unit: Unit.TABLESPOON },
          { name: "Milk", quantity: 150, unit: Unit.MILLILITER },
          { name: "Honey", quantity: 100, unit: Unit.GRAM },
          { name: "Ketchup", quantity: 110, unit: Unit.GRAM },
          { name: "Gochujang Paste", quantity: 1, unit: Unit.TABLESPOON },
          { name: "Black powder", quantity: 0.5, unit: Unit.TABLESPOON },
          { name: "Sunflower oil", quantity: 1, unit: Unit.LITER },
        ],
      },
      tag: { connect: [{ name: "Dinner" }, { name: "Spicy" }] },
    },
  });

  const spaghettiCarbonara = await prisma.recipe.create({
    data: {
      name: "Spaghetti Carbonara",
      slug: "spaghetti-carbonara",
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
      images: [
        "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
      ],
      visibility: "PUBLIC",
      authorId: admin.id,
      categoryId: 5,
      ingredients: {
        create: [
          { name: "Spaghetti", quantity: 200, unit: Unit.GRAM },
          { name: "Pancetta or bacon", quantity: 100, unit: Unit.GRAM },
          { name: "Eggs", quantity: 3, unit: Unit.PIECE },
          { name: "Parmesan cheese", quantity: 50, unit: Unit.GRAM },
          { name: "Black pepper", quantity: 1, unit: Unit.PINCH },
        ],
      },
      tag: { connect: [{ name: "Quick" }, { name: "Lunch" }] },
    },
  });

  const pancakes = await prisma.recipe.create({
    data: {
      name: "Pancakes",
      slug: "pancakes",
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
      images: [
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/9767DACF-96E6-417B-9BE9-DA57EAC9462D/Derivates/2f26d615-1da2-43dd-a39e-6a54742c9299.jpg",
      ],
      visibility: "PUBLIC",
      authorId: admin.id,
      categoryId: 1,
      ingredients: {
        create: [
          { name: "Flour", quantity: 200, unit: Unit.GRAM },
          { name: "Sugar", quantity: 2, unit: Unit.TABLESPOON },
          { name: "Baking powder", quantity: 2, unit: Unit.TEASPOON },
          { name: "Salt", quantity: 0.25, unit: Unit.TEASPOON },
          { name: "Milk", quantity: 250, unit: Unit.MILLILITER },
          { name: "Eggs", quantity: 2, unit: Unit.PIECE },
          { name: "Butter (melted)", quantity: 30, unit: Unit.GRAM },
        ],
      },
      tag: { connect: [{ name: "Breakfast" }, { name: "Quick" }] },
    },
  });

  const adminFavorites = await prisma.recipeList.create({
    data: {
      name: "Favorites",
      isSystem: true,
      userId: admin.id,
      recipes: {
        connect: [{ id: koreanChicken.id }, { id: spaghettiCarbonara.id }],
      },
    },
  });

  const userFavorites = await prisma.recipeList.create({
    data: {
      name: "Favorites",
      isSystem: true,
      userId: user.id,
      recipes: { connect: [{ id: pancakes.id }] },
    },
  });

  await prisma.user.update({
    where: { id: admin.id },
    data: {
      shoppingList: {
        create: [
          {
            name: "Eggs",
            quantity: 6,
            unit: Unit.PIECE,
            recipeId: pancakes.id,
          },
          {
            name: "Milk",
            quantity: 1,
            unit: Unit.LITER,
            recipeId: pancakes.id,
          },
          {
            name: "Flour",
            quantity: 500,
            unit: Unit.GRAM,
            recipeId: pancakes.id,
          },
          {
            name: "Sugar",
            quantity: 1,
            unit: Unit.KILOGRAM,
            recipeId: pancakes.id,
          },
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      shoppingList: {
        create: [
          {
            name: "Eggs",
            quantity: 6,
            unit: Unit.PIECE,
            recipeId: pancakes.id,
          },
          {
            name: "Milk",
            quantity: 1,
            unit: Unit.LITER,
            recipeId: pancakes.id,
          },
          {
            name: "Flour",
            quantity: 500,
            unit: Unit.GRAM,
            recipeId: pancakes.id,
          },
          {
            name: "Sugar",
            quantity: 1,
            unit: Unit.KILOGRAM,
            recipeId: pancakes.id,
          },
        ],
      },
    },
  });

  console.log("Seeding done! Happy coding my friend!");
}

seedDatabase()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
