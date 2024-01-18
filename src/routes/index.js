const { Router } = require("express");
const router = Router();
const authRouter = require("./auth.route");
const queueRouter = require("./queue.route");
const candidateRouter = require("./candidate.route");

router.use("/auth", authRouter);
router.use("/queue", queueRouter);
router.use("/candidate", candidateRouter);

module.exports = router;
