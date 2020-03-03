// send email
console.log('send email...');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = (config) => sgMail.send(config);
