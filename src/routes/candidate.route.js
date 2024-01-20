const { Router } = require("express");
const {
    addCandidateToQueue,
    updateCandidate,
    deleteCandidateOfTheQueue,
} = require("../controllers/candidate.controller");
const { authCheck } = require("../middlewares/auth.middleware");
const router = Router();

// Add Candidate To Queue
router.post("", authCheck, addCandidateToQueue.validator, addCandidateToQueue.controller);
// Update Candidate From Queue
router.put("/:candidateId", authCheck, updateCandidate.validator, updateCandidate.controller);
// Delete Candidate From Queue
router.delete("/:candidateId", authCheck, deleteCandidateOfTheQueue.validator, deleteCandidateOfTheQueue.controller);

module.exports = router;
