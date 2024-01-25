const { Router } = require("express");
const {
    addCandidateToQueue,
    updateCandidate,
    deleteCandidateOfTheQueue,
    updateMultipleCandidates,
} = require("../controllers/candidate.controller");
const { authCheck } = require("../middlewares/auth.middleware");
const router = Router();

// Add Candidate To Queue
router.post("", authCheck, addCandidateToQueue.validator, addCandidateToQueue.controller);
// Update Candidate From Queue
router.put("/:candidateId", authCheck, updateCandidate.validator, updateCandidate.controller);
// Update Multiple Candidate From Queue
router.put("", authCheck, updateMultipleCandidates.validator, updateMultipleCandidates.controller);
// Delete Candidate From Queue
router.delete("/:candidateId", authCheck, deleteCandidateOfTheQueue.validator, deleteCandidateOfTheQueue.controller);

module.exports = router;
