const nodeMailer = require('nodemailer'); 
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

// Configure our transport using env settings
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a5387e40e7bc21",
    pass: "decb7e64c5722d"
  }
});

const generateHTML = (filename, options = {}) => {
  // Use pug plugin to render an HTML string from our pug template + styles
  const html =  renderFile(`${__dirname}/../email/email/${filename}.html`, options);
  // Use juice plugin to parse our html and inline the css to support older email clients
  return juice(html);
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: 'Shawn Stern <stern.shawn@gmail.com>',
    to: options.user.email,
    subject: options.subject,
    html,
    text,
  };

  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
