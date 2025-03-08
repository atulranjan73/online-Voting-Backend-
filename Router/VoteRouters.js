
const express = require('express');
const router = express.Router();
const usercontrooler = require("../Controller/usercontroller");

router.post("/vote", usercontrooler.vote)
router.get("/votecount", usercontrooler.votecount)

module.exports = router;