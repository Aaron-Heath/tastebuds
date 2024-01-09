const nodemailer = require('nodemailer');


/**
 * Handles email related functions for the application. 
 */
class MailService {
    #transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    #applicationUrl;

    // Constructor uses environment variable to build application url for either local or production environment.
    constructor() {
        if(JSON.parse(process.env.PROD_ENV)) {
            this.#applicationUrl = "https://tastebuds-app-de96bd264a71.herokuapp.com";
        } else {
            process.env.PORT ? this.#applicationUrl = "localhost:" + process.env.PORT : this.#applicationUrl = "localhost:3001"
        }
    }
    

    /**
     * Sends a verification email to the newly registered user. Provides a link that will verify and activate their account.
     * @param {User} user  is the user object to be sent the email. 
     */
    async sendVerificationEmail(user) {
        
        let mailOptions = {
            from: 'noreply.tastebuds@gmail.com',
            to: user.email,
            subject: 'Welcome to TasteBuds! Please verify your account',
            html: '<p>Thank you for signing up for TasteBuds! To verify your account, please click <a href="' + this.#applicationUrl + '/activate?uuid=' + user.uuid + '">here<a> or copy and pase the link below: <br><br>' + '<a href="' + this.#applicationUrl + '/api/user/activate?user=' + user.uuid + '">' + this.#applicationUrl + '/api/user/activate?user=' + user.uuid + '<a>'
        };

        await this.#transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent to " + user.email + " successfully.");
            }
        });
    }

}

module.exports = MailService;
