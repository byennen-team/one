Meteor.Mandrill = {
  options: {},
  config: function (options) {
    this.options.username = options.username;
    this.options.key = options.key;
    this.options.host = "smtp.mandrillapp.com";
    this.options.port = "587";
    // setn the environment SMTP server
    process.env.MAIL_URL = "smtp://" + this.options.username + ":" + this.options.key + "@" + this.options.host + ":" + this.options.port + "/";
  },
  send: function (options) {
    Email.send(options);
  },
  sendTemplate: function (options) {
    var url = "https://mandrillapp.com/api/1.0/messages/send-template.json",
    result;

    options = {
      "data": {
        "key": options.key || this.options.key,
        "template_name": options.template_name,
        "template_content": options.template_content,
        "message": options.message,
        "headers": [{
          "Content-Type": "application/json"
        }]
      }
    };

    try {
      return HTTP.post(url, options);
    } catch (err) {
      console.error(err);
    }
  }
};
