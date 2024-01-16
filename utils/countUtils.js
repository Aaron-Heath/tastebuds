
// const { Cookbook, Recipe } = require('../../models');

// async function getCookbookCount(creatorId) {
//     try {
//         const cookbookCount = await Cookbook.count({
//             where: {
//                 creator_id: creatorId
//             }
//         });
//         return cookbookCount;
//     } catch (error) {
//         console.error('Error fetching cookbook count:', error.message);
//         throw error;
//     }
// }

// async function getRecipeCount() {
//     try {
//         const recipeCount = await Recipe.count();
//         return recipeCount;
//     } catch (error) {
//         console.error('Error fetching recipe count:', error.message);
//         throw error;
//     }
// }

// module.exports = { getCookbookCount, getRecipeCount };
