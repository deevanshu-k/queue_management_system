const { Router } = require("express");
const {
    createQueue,
    updateQueue,
    deleteQueue,
} = require("../controllers/queue.controller");
const { authCheck } = require("../middlewares/auth.middleware");
const router = Router();

// Create Queue
router.post("", createQueue);
// Update Queue Data
router.put("", authCheck, updateQueue);
// Delete Queue
router.delete("", authCheck, deleteQueue);

module.exports = router;
