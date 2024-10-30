const {Cookbook} = require("../models");

const DEFAULT_COOKBOOK_NAME = "My Cookbook";

class CookbookService {
    constructor() {

    }

    /**
     * Creates the default cookbook for the user when the user is created. Pass the generated ID from the userData.
     * @param {id} userData 
     * @returns 
     */
    async createDefaultCookbook(userData) {
        try {
            const cookbookData = await Cookbook.create({
                creator_id: userData.id,
                title: DEFAULT_COOKBOOK_NAME,
                isPublic: false,
                description: "This is my default cookbook!",
                viewers: null,
                editors: null,
                recipes: null
            });

            return {
                success: true,
                message: "Cookbook created",
                data: cookbookData
            };
        } catch (error) {
            return {
                success:false,
                message: error,
                data: null
            }
            
        }
    }

}

module.exports = new CookbookService();