const { UniqueConstraintError } = require("sequelize");
const { User } = require("../models")
const { uuid } = require('uuidv4');



/**
 * Handles user functions for the userRoutes. Separating concerns.
 */

class UserService {
    constructor() {

    }

    /**
     * Creates user using the POST payload with firstName, lastName, email, password, username
     * 
     * Will throw an error with a descriptive message that can be sent back to the user.  
     */
    async createUser({firstName, lastName, email, password, username}) {
        console.log("creating user");

        let userData;
        try {
            const userData = await User.create({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                uuid: uuid()
            });

            console.log("User Created")
            return {
                success: true,
                message: "User created",
                data: userData
            }
        } catch(err) {
            const message = err instanceof UniqueConstraintError ? "Username or email already in use" : "Something went wrong, please try again";
            return {
                success: false,
                message: message,
                data: null
            }
        }
    }

}

module.exports = new UserService();