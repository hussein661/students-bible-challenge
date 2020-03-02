const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "andrew@mead.io",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "andrew@mead.io",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  });
};

const sendResetLink = (email, link) => {
  sgMail.send({
    to: email,
    from: "info@publica-lebanon.com",
    subject: "publica reset email",
    text: `hello please find out the link. http://${link}`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
  sendResetLink
};
