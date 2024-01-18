const { Model } = require('sequelize');
const { User, Cookbook, UserCookbook, CookbookRecipe, Recipe  } = require('../models');

/**
 * Service checks user permissions against the resources they're trying to view, change, or create 
 */
class AuthorizationService {
    #models;
    
    #authorized = ['owner','viewer', 'editor'];

    constructor() {
        this.#models = {
            'user' : User,
            'cookbook': Cookbook,
            'usercokbook': UserCookbook,
            'cookbookrecipe': CookbookRecipe,
            'recipe': Recipe
        }

    }


    #ownsCookbook(userId, cookbook) {
        return userId == cookbook.creator_id;
    }

    getAuthorized() {
        return this.#authorized;
    }

    /**
     * Cascades permissions from highest to lowest e.g. owner -> global private-public setting.
     * @param {Int} userId - String userid. MUST COME FROM SESSION
     * @param {Cookbook} cookbook - Cookbook model returned from query.
     * @returns {String} permissions if found. Else returns null. Queries global permissions of cookbook as well. 
     */
    async getCookbookPermissions(userId, cookbook, checkRecipe=false) {
        if(!checkRecipe) {
            if(this.#ownsCookbook(userId,cookbook)) {
                return 'owner'
            }
        }
        const cookbookPermissions = await UserCookbook.findOne({
            where: {
                user_id: userId,
                cookbook_id: cookbook.id
            }
        });

        if(cookbookPermissions) {
            return cookbookPermissions.permissions;
        }

        if (cookbook.isPublic) {
            return 'viewer'
        }
        return null;

    }

    #ownsRecipe(userId, recipe) {
        return userId === recipe.creator_id;
    }

    async getRecipePermissions(userId, recipe) {
        if(this.#ownsRecipe(userId,recipe)) return 'owner';

        const cookbook = await CookbookRecipe.findOne({
                where: {
                recipe_id: recipe.id
            }
        });


    if(await this.getCookbookPermissions(userId, cookbook, true) != null) {
        return 'viewer';
    }

    }
}

module.exports = AuthorizationService;