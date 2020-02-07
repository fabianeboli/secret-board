const express = require("express");
const router = express.Router();
const messages = require("../controllers/Message.controller");

router.get("/", messages.messages_list);


router.post('/:id/delete', messages.delete_message);
router.post("/new-message", messages.create_messages_post);
router.get("/new-message", messages.create_messages_get);


module.exports = router;
