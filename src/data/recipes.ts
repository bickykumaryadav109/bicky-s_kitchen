export interface Recipe {
    id: string;
    title: string;
    description?: string;
    prepTime: string;
    servings: number | string;
    calories: string;
    ingredients?: string[];
    instructions?: string[];
    image?: string; // Emoji or URL
    category: string; // 'breakfast', 'vegan', 'desserts', 'italian', 'quick meals', 'healthy'
    videoFrames?: string[];
    videoId?: string;
}

export const RECIPES: Recipe[] = [
    {
        id: '1',
        title: "Fluffy Pancakes",
        description: "Light, airy, and golden brown pancakes perfect for a sunday morning breakfast.",
        prepTime: "20 mins",
        servings: 4,
        calories: "350",
        ingredients: ["1.5 cups All-purpose Flour", "3.5 tsp Baking Powder", "1 tbsp Sugar", "1.25 cups Milk", "1 Egg", "3 tbsp Butter, melted"],
        instructions: [
            "Sift flour, baking powder, salt and sugar together in a large bowl.",
            "Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.",
            "Heat a lightly oiled griddle or frying pan over medium high heat.",
            "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.",
            "Brown on both sides and serve hot."
        ],
        image: "🥞",
        category: "breakfast"
    },
    {
        id: '2',
        title: "Avocado Toast",
        description: "Creamy avocado on toasted sourdough topped with seasonings for a quick healthy bite.",
        prepTime: "10 mins",
        servings: 1,
        calories: "280",
        ingredients: ["1 slice Sourdough Bread", "1/2 Avocado (ripe)", "1 pinch Salt", "1 pinch Red Pepper Flakes", "1 tsp Lemon Juice"],
        instructions: [
            "Toast the sourdough bread until golden and crisp.",
            "Mash the avocado in a small bowl with lemon juice and salt.",
            "Spread the mashed avocado generously over the toast.",
            "Sprinkle with red pepper flakes and serve immediately."
        ],
        image: "🥑",
        category: "breakfast"
    },
    {
        id: '3',
        title: "Oatmeal Bowl",
        description: "Hearty warming oatmeal topped with fresh fruits and a drizzle of honey.",
        prepTime: "15 mins",
        servings: 1,
        calories: "220",
        ingredients: ["1/2 cup Rolled Oats", "1 cup Water or Milk", "1 Banana (sliced)", "1 tsp Honey", "1 pinch Cinnamon"],
        instructions: [
            "Boil water or milk in a small saucepan.",
            "Stir in oats and reduce heat to a simmer.",
            "Cook for 5-10 minutes until thickened, stirring occasionally.",
            "Pour into a bowl and top with banana slices, honey, and cinnamon."
        ],
        image: "🥣",
        category: "breakfast"
    },
    {
        id: '4',
        title: "Quinoa Salad",
        description: "A protein-packed vegan salad with fluffy quinoa and crisp vegetables.",
        prepTime: "25 mins",
        servings: 2,
        calories: "310",
        ingredients: ["1 cup Quinoa (cooked)", "1/2 Cucumber (diced)", "1/2 Bell Pepper (diced)", "1/4 cup Parsley", "2 tbsp Lemon Vinaigrette"],
        instructions: [
            "Cook quinoa according to package instructions and let cool.",
            "Chop cucumber, bell pepper, and parsley.",
            "In a large bowl, combine quinoa and vegetables.",
            "Drizzle with lemon vinaigrette and toss to combine."
        ],
        image: "🥗",
        category: "vegan"
    },
    {
        id: '5',
        title: "Lentil Soup",
        description: "Comforting and hearty lentil soup rich in fiber and flavor.",
        prepTime: "40 mins",
        servings: 4,
        calories: "290",
        ingredients: ["1 cup Dried Lentils", "1 Onion (chopped)", "2 Carrots (chopped)", "4 cups Vegetable Broth", "1 tsp Cumin"],
        instructions: [
            "Sauté onion and carrots in a pot until soft.",
            "Add lentils, broth, and cumin.",
            "Bring to a boil, then simmer for 30 minutes until lentils are tender.",
            "Season with salt and pepper to taste."
        ],
        image: "🍲",
        category: "vegan"
    },
    {
        id: '6',
        title: "Chocolate Cake",
        description: "Decadent, moist chocolate cake for the ultimate dessert treat.",
        prepTime: "60 mins",
        servings: 8,
        calories: "500",
        ingredients: ["1.75 cups Flour", "2 cups Sugar", "3/4 cup Cocoa Powder", "1.5 tsp Baking Powder", "2 Eggs", "1 cup Milk"],
        instructions: [
            "Preheat oven to 350°F (175°C). Grease baking pans.",
            "Mix dry ingredients in a bowl.",
            "Add eggs, milk, oil, and vanilla; beat for 2 minutes.",
            "Stir in boiling water (batter will be thin).",
            "Pour into pans and bake for 30-35 minutes."
        ],
        image: "🍰",
        category: "desserts"
    },
    {
        id: '7',
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        prepTime: "30 mins",
        servings: 4,
        calories: "600",
        ingredients: ["400g Spaghetti", "150g Pancetta (cubed)", "4 Large Eggs", "100g Pecorino Romano", "Black Pepper"],
        instructions: [
            "Boil salted water and cook spaghetti until al dente.",
            "Fry pancetta in a pan until crisp.",
            "Whisk eggs and grated cheese in a bowl with plenty of pepper.",
            "Drain pasta (reserve some water) and toss with pancetta.",
            "Remove from heat and quickly mix in egg mixture to create creamy sauce."
        ],
        image: "🍝",
        category: "italian"
    },
    {
        id: '8',
        title: "Margherita Pizza",
        description: "Simple yet perfect pizza with tomato, mozzarella, and fresh basil.",
        prepTime: "45 mins",
        servings: 2,
        calories: "700",
        ingredients: ["1 Pizza Dough Ball", "1/2 cup Tomato Sauce", "1 cup Fresh Mozzarella", "Fresh Basil Leaves", "Olive Oil"],
        instructions: [
            "Preheat oven to 450°F (230°C).",
            "Roll out dough on a floured surface.",
            "Spread tomato sauce and top with mozzarella slices.",
            "Bake for 10-15 minutes until crust is golden and cheese items.",
            "Garnish with fresh basil and olive oil."
        ],
        image: "🍕",
        category: "italian"
    },
    {
        id: 'demo',
        title: "Mediterranean Summer Salad",
        description: "A fresh and vibrant salad featuring seasonal vegetables and a zesty vinaigrette.",
        prepTime: "15 mins",
        servings: 2,
        calories: "320",
        ingredients: ["Cherry Tomatoes", "Cucumber", "Red Onion", "Feta Cheese", "Olive Oil", "Oregano"],
        instructions: [
            "Wash and slice the cherry tomatoes in half.",
            "Chop the cucumber and red onion into small cubes.",
            "Whisk olive oil with oregano, salt, and pepper.",
            "Combine all vegetables in a bowl and toss with the dressing.",
            "Top with crumbled feta cheese and serve immediately."
        ],
        image: "🥗",
        category: "healthy"
    }
];

export const getAllRecipes = () => RECIPES;

export const getRecipeById = (id: string) => RECIPES.find(r => r.id === id);

export const getRecipesByCategory = (category: string) => {
    return RECIPES.filter(r => r.category.toLowerCase() === category.toLowerCase());
};

export const searchRecipes = (query: string) => {
    const q = query.toLowerCase();
    return RECIPES.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
    );
};
