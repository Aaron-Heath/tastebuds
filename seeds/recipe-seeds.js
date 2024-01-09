const { Recipe } = require('../models');

const recipeData = [
    {
        creator_id: 2,
        title: 'Cheese Pizza',
        ingredients: { '1': 'Frozen pizza'},
        directions: { 
            'Step One': 'Preheat oven to 500 degrees.',
            'Step Two': 'Insert unwrapped frozen pizza into oven and cook for recommended time.',
            'Step Three': 'Remove from oven when time is up, cut, and eat!'
        }
    },
    {
        creator_id: 1,
        title: 'Garfield Lasagna',
        ingredients: { 
            '1': '2 pounds of lasagna noodles',
            '2': 'A quart of tomato sauce',
            '3': 'A pound of shredded cheese'
        },
        directions: {
            'Step One': 'Preheat oven to 500 degrees.',
            'Step Two': 'In a baking dish, layer noodles, sauce, and cheese, leaving a half inch of room from the top of the dish.',
            'Step Three': 'Place dish into oven and back for 40 minutes - 1 hour.',
            'Step Four': 'Remove dish from oven and allow to set for 15 minutes before serving.'
        }
    }
]

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;