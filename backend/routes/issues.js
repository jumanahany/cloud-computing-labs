const express = require("express");
const issuesController = require("../controllers/issues");

const router = express.Router();

router.get("/", issuesController.listIssues);
router.post("/", issuesController.createIssue);
router.patch("/:id/status", issuesController.updateIssueStatus);

module.exports = router;
