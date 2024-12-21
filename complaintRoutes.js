// const express = require("express");
// const {
//     addComplaint,
//     getAllComplaints,
//     getUnresolvedComplaints,
//     getPrioritizedComplaints,
//     getLocationConnections,
// } = require("../controllers/complaintController");

// const router = express.Router();

// router.post("/add",addComplaint);
// router.get("/list", getAllComplaints);
// router.get("/unresolved", getUnresolvedComplaints);
// router.get("/prioritized", getPrioritizedComplaints);
// router.get("/location/:location", getLocationConnections);

// module.exports = router;
const express = require("express");
const {
    addComplaint,
    getAllComplaints,
    getUnresolvedComplaints,
    getPrioritizedComplaints,
    getLocationConnections,
} = require("../controllers/complaintController");

const router = express.Router();

router.post("/add", addComplaint); // Add a complaint
router.get("/list", getAllComplaints); // List all complaints
router.get("/unresolved", getUnresolvedComplaints); // Get unresolved complaints
router.get("/prioritized", getPrioritizedComplaints); // Get prioritized complaints
router.get("/location/:location", getLocationConnections); // Get complaints by location

module.exports = router;
