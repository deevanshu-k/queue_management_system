const { Router } = require("express");
const {
    createQueue,
    updateQueue,
    deleteQueue,
} = require("../controllers/queue.controller");
const { authCheck } = require("../middlewares/auth.middleware");
const router = Router();

// Create Queue
router.post("", createQueue.validator, createQueue.controller);
// Update Queue Data
router.put("", authCheck, updateQueue.validator, updateQueue.controller);
// Delete Queue
router.delete("", authCheck, deleteQueue.validator, deleteQueue.controller);

module.exports = router;
