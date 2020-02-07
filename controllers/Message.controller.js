const Message = require("../models/Message.model.js");

const messages_list = (req, res, next) => {
  Message.find({}).exec((err, list_messages) => {
    if (err) return next(err);
    res.render("messages", { messages_list: list_messages, user: req.user });
  });
};

const create_messages_get = (req, res, next) => res.render("new-message");

const create_messages_post = (req, res, next) => {
  const { title, message } = req.body;
  new Message({
    author: req.user.username,
    title,
    message,
    timestamp: Date.now()
  }).save(err => {
    if (err) return next(err);
  });

  res.redirect("/");
};

const delete_message = (req, res, next) => {
  Message.findByIdAndDelete(req.params.id, err => {
    if (err) return next(err);
    res.redirect("/");
  });
  // res.redirect('/')
};

module.exports = {
  messages_list,
  create_messages_get,
  create_messages_post,
  delete_message
};
