const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: 'mohameddhiaa.boubaker@polytechnicien.tn',
                pass: 'mohamedhamidou0',
            },
        });

        await transporter.sendMail({
            from: 'mohameddhiaa.boubaker@polytechnicien.tn',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;