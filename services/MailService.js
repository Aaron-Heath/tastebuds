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

    /**
     * Sends a verification email to the newly registered user. Provides a link that will verify and activate their account.
     * @param {User} user  is the user object to be sent the email. 
     */
    async sendVerificationEmail(user) {
        let mailOptions = {
            from: 'noreply.tastebuds@gmail.com',
            to: user.email,
            subject: 'Welcome to TasteBuds! Please verify your account',
            text: "This will eventually be a link!"
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
