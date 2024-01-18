const { Router } = require("express");
const { authQueueManager } = require("../controllers/auth.controller");
const router = Router();

// Login Request For Queue Manager
// url: http://127.0.0.1:3000/api/auth/queue/manager?queueId=<ID>&pswd=<PASSWORD>
// you will get cridentials in query
router.post("/queue/manager", authQueueManager);

module.exports = router;
