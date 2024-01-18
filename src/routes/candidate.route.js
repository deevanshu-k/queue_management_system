const { Router } = require("express");
const {
    addCandidateToQueue,
    updateCandidateStatus,
    deleteCandidateOfTheQueue,
} = require("../controllers/candidate.controller");
const { authCheck } = require("../middlewares/auth.middleware");
const router = Router();

// Add Candidate To Queue
router.post("", authCheck, addCandidateToQueue);
// Check/Uncheck Candidate From Queue
router.put("/:candidateId", authCheck, updateCandidateStatus);
// Delete Candidate From Queue
router.delete("/:candidateId", authCheck, deleteCandidateOfTheQueue);

module.exports = router;
