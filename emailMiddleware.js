const nodemailer = require('nodemailer')

const sendMail = async (mailTo, subject, body) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rahulmahajan98645@gmail.com',
            pass: 'ufbaxtyulasyfxsj'
        }
    })

    let mailDetails = {
        from: 'rahulmahajan98645@gmail.com',
        to: mailTo,
        subject,
        text: body
    }

    try {
        await mailTransporter.sendMail(mailDetails)
        return 'email sent successfully'
    } catch(err) {
        return err
    }
}

module.exports = {sendMail}