import nodemailer from "nodemailer";

const mail = {
    from: `${process.env.VUE_APP_MAIL_USER}`,
    service: `${process.env.VUE_APP_MAIL_SERVICE}`,
    auth: {
        user: `${process.env.VUE_APP_MAIL_USER}`,
        pass: `${process.env.VUE_APP_MAIL_PWD}`
    },
}


export function sendEmail(to, subject, template) {
    const transporter = nodemailer.createTransport({
        service: mail.service,
        auth: {
            user: mail.auth.user,
            pass: mail.auth.pass
        }
    });
    const options = {
        from: mail.from,
        to: to,
        subject: subject,
        html: template
    };

    transporter.sendMail(options, (err, info) => {
        if(err) {
            console.error(err);
        } else {
            console.log("email sent : ", info.response);
        }
    });
}



