const { isValidEdge } = require("../utils/validator");
const hasCycle = require("../utils/cycle");
const buildTree = require("../utils/treeBuilder");
const calculateDepth = require("../utils/depth");

function processGraph(data) {

    const invalidEntries = [];
    const duplicateEdges = [];

    const seenEdges = new Set();
    const duplicateSeen = new Set();

    const validEdges = [];

    // Validation + Duplicate Detection
    for (let edge of data) {

        edge = edge.trim();

        if (!isValidEdge(edge)) {
            invalidEntries.push(edge);
            continue;
        }

        if (seenEdges.has(edge)) {

            if (!duplicateSeen.has(edge)) {
                duplicateEdges.push(edge);
                duplicateSeen.add(edge);
            }

            continue;
        }

        seenEdges.add(edge);
        validEdges.push(edge);
    }

    // Graph Construction
    const graph = {};
    const parentMap = {};

    for (const edge of validEdges) {

        const [parent, child] = edge.split("->");

        // First parent wins
        if (parentMap[child]) {
            continue;
        }

        parentMap[child] = parent;

        if (!graph[parent]) {
            graph[parent] = [];
        }

        graph[parent].push(child);
    }

    // Collect Nodes
    const nodes = new Set();

    Object.keys(graph).forEach(parent => {

        nodes.add(parent);

        graph[parent].forEach(child => {
            nodes.add(child);
        });
    });

    // Root Detection
    const roots = [];

    nodes.forEach(node => {

        if (!parentMap[node]) {
            roots.push(node);
        }
    });

    const hierarchies = [];

    // PURE CYCLE CASE
    if (roots.length === 0 && nodes.size > 0) {

        const firstNode = [...nodes].sort()[0];

        hierarchies.push({
            root: firstNode,
            tree: {},
            has_cycle: true
        });

    } else {

        for (const root of roots.sort()) {

            const cycleExists = hasCycle(graph, root);

            if (cycleExists) {

                hierarchies.push({
                    root,
                    tree: {},
                    has_cycle: true
                });

                continue;
            }

            const tree = {
                [root]: buildTree(root, graph)
            };

            const depth = calculateDepth(root, graph);

            hierarchies.push({
                root,
                tree,
                depth
            });
        }
    }

    // Summary
    let totalTrees = 0;
    let totalCycles = 0;

    let largestTreeRoot = "";
    let maxDepth = -1;

    for (const hierarchy of hierarchies) {

        if (hierarchy.has_cycle) {
            totalCycles++;
            continue;
        }

        totalTrees++;

        if (hierarchy.depth > maxDepth) {
            maxDepth = hierarchy.depth;
            largestTreeRoot = hierarchy.root;
        }
    }

    return {
        user_id: "anmol_02012007",
        email_id: "anmol0200.be23@chitkara.edu.in",
        college_roll_number: "2310990200",

        hierarchies,

        invalid_entries: invalidEntries,

        duplicate_edges: duplicateEdges,

        summary: {
            total_trees: totalTrees,
            total_cycles: totalCycles,
            largest_tree_root: largestTreeRoot
        }
    };
}

module.exports = processGraph;