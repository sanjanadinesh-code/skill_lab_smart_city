// const complaints = require("../models/complaint");
// const Queue = require("../utils/queue");
// const BST = require("../utils/bst");
// const Graph = require("../utils/graph");

// const unresolvedQueue = new Queue();
// const priorityTree = new BST();
// const locationGraph = new Graph();

// // Initialize locations in the graph
// locationGraph.addVertex("Mangalore");
// locationGraph.addVertex("Park Street");
// locationGraph.addEdge("Mangalore", "Park Street");

// // Add a new complaint
// const addComplaint = (req, res) => {
//     const complaint = req.body;
//     complaints.push(complaint);
//     unresolvedQueue.enqueue(complaint);
//     priorityTree.insert(complaint);
//     locationGraph.addVertex(complaint.location);
//     res.send({ message: "Complaint added successfully!" });
// };

// // Get all complaints
// const getAllComplaints = (req, res) => {
//     res.send(complaints);
// };

// // Get unresolved complaints
// const getUnresolvedComplaints = (req, res) => {
//     res.send(unresolvedQueue.items);
// };

// // Get prioritized complaints
// const getPrioritizedComplaints = (req, res) => {
//     const sorted = priorityTree.inOrderTraversal(priorityTree.root);
//     res.send(sorted);
// };

// // Get location connections
// const getLocationConnections = (req, res) => {
//     const { location } = req.params;
//     const connections = locationGraph.getConnections(location);
//     res.send(connections);
// };

// module.exports = {
//     addComplaint,
//     getAllComplaints,
//     getUnresolvedComplaints,
//     getPrioritizedComplaints,
//     getLocationConnections,
// };
const fs = require('fs');
const path = require('path'); // Optional: for better path handling

let complaints = []; // Array to store complaints
let unresolvedStack = []; // Stack for unresolved complaints
let priorityTree = null; // Binary Search Tree for prioritized complaints
let locationGraph = {}; // Graph for complaints by location

// Helper: Binary Search Tree for prioritizing complaints
class BSTNode {
    constructor(priority, complaint) {
        this.priority = priority;
        this.complaint = complaint;
        this.left = null;
        this.right = null;
    }
}

function insertIntoBST(root, priority, complaint) {
    if (!root) return new BSTNode(priority, complaint);
    if (priority < root.priority) {
        root.left = insertIntoBST(root.left, priority, complaint);
    } else {
        root.right = insertIntoBST(root.right, priority, complaint);
    }
    return root;
}

function inorderTraversal(root, result) {
    if (!root) return;
    inorderTraversal(root.left, result);
    result.push(root.complaint);
    inorderTraversal(root.right, result);
}
// const addComplaint = (req, res) => {
//     const { id, category, description, tags, location, priority, status } = req.body;

//     if (!id || !category || !description || !location || !priority || !status) {
//         return res.status(400).send({ error: "Missing required fields in complaint data." });
//     }

//     const complaint = { id, category, description, tags, location, priority, status };
//     complaints.push(complaint);

//     // Add to unresolved stack if status is unresolved
//     if (status === "unresolved") {
//         unresolvedStack.push(complaint);
//     }

//     // Add to priority tree
//     priorityTree = insertIntoBST(priorityTree, priority, complaint);

//     // Add to location graph
//     if (!locationGraph[location]) locationGraph[location] = [];
//     locationGraph[location].push(complaint);

//     res.status(201).send({ message: "Complaint added successfully!", complaint });
// };

// const getAllComplaints = (req, res) => {
//     res.status(200).send({ complaints });
// };

// const getUnresolvedComplaints = (req, res) => {
//     res.status(200).send({ unresolvedComplaints: unresolvedStack });
// };

// const getPrioritizedComplaints = (req, res) => {
//     const prioritizedComplaints = [];
//     inorderTraversal(priorityTree, prioritizedComplaints);
//     res.status(200).send({ prioritizedComplaints });
// };

// const getLocationConnections = (req, res) => {
//     const location = req.params.location;
//     if (!locationGraph[location]) {
//         return res.status(404).send({ error: "No complaints found for this location." });
//     }
//     res.status(200).send({ complaints: locationGraph[location] });
// };

// module.exports = {
//     addComplaint,
//     getAllComplaints,
//     getUnresolvedComplaints,
//     getPrioritizedComplaints,
//     getLocationConnections,
// };
const addComplaint = (req, res) => {
    const { id, category, description, tags, location, priority, status } = req.body;

    if (!id || !category || !description || !location || !priority || !status) {
        return res.status(400).send({ error: "Missing required fields in complaint data." });
    }

    const complaint = { id, category, description, tags, location, priority, status };
    complaints.push(complaint);

    // Add to unresolved stack if status is unresolved
    if (status === "unresolved") {
        unresolvedStack.push(complaint);
    }

    // Add to priority tree
    priorityTree = insertIntoBST(priorityTree, priority, complaint);

    // Add to location graph
    if (!locationGraph[location]) locationGraph[location] = [];
    locationGraph[location].push(complaint);

    // Write to a text file
    fs.appendFileSync('complaints_log.txt', `Complaint added: ${JSON.stringify(complaint)}\n`);
    
    res.status(201).send({ message: "Complaint added successfully!", complaint });
};

const getAllComplaints = (req, res) => {
    const output = `All Complaints:\n${JSON.stringify(complaints, null, 2)}\n`;
    fs.writeFileSync('all_complaints.txt', output);
    
    res.status(200).send({ message: "All complaints stored in all_complaints.txt" });
};

const getUnresolvedComplaints = (req, res) => {
    const output = `Unresolved Complaints:\n${JSON.stringify(unresolvedStack, null, 2)}\n`;
    fs.writeFileSync('unresolved_complaints.txt', output);
    
    res.status(200).send({ message: "Unresolved complaints stored in unresolved_complaints.txt" });
};

const getPrioritizedComplaints = (req, res) => {
    const prioritizedComplaints = [];
    inorderTraversal(priorityTree, prioritizedComplaints);
    
    const output = `Prioritized Complaints:\n${JSON.stringify(prioritizedComplaints, null, 2)}\n`;
    fs.writeFileSync('prioritized_complaints.txt', output);
    
    res.status(200).send({ message: "Prioritized complaints stored in prioritized_complaints.txt" });
};

const getLocationConnections = (req, res) => {
    const location = req.params.location;
    
    if (!locationGraph[location]) {
        return res.status(404).send({ error: "No complaints found for this location." });
    }
    
    const output = `Complaints at ${location}:\n${JSON.stringify(locationGraph[location], null, 2)}\n`;
    fs.writeFileSync(`${location}_complaints.txt`, output);
    
    res.status(200).send({ message: `Complaints for ${location} stored in ${location}_complaints.txt` });
};
module.exports = {
    addComplaint,
    getAllComplaints,
    getUnresolvedComplaints,
    getPrioritizedComplaints,
    getLocationConnections,
};
