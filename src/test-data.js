const graph0 = {
    nodes: [
        { id: 1, name: "Task#1" },
        { id: 2, name: "Task#2" },
        { id: 3, name: "Task#3" },
        { id: 4, name: "Task#4" }
    ],
    edges: [
        {from: 2, to: 3},
        {from: 1, to: 3},
        {from: 2, to: 4}
    ]
};

const graph1 = {
    nodes: [
        { id: 1, name: "Task#1" },
        { id: 2, name: "Task#2" },
        { id: 3, name: "Task#3" },
        { id: 4, name: "Task#4" },
        { id: 5, name: "Task#5" },
        { id: 6, name: "Task#6" },
    ],
    edges: [
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 3, to: 4},
        {from: 1, to: 5},
        {from: 5, to: 4},
        {from: 5, to: 6},
    ]
};

const graph2 = {
    nodes: [
        { id: 1, name: "Task#1" },
        { id: 2, name: "Task#2" },
        { id: 3, name: "Task#3" },
        { id: 4, name: "Task#4" },
        { id: 5, name: "Task#5" },
        { id: 6, name: "Task#6" },
    ],
    edges: [
        {from: 1, to: 2},
        {from: 1, to: 4},
        {from: 2, to: 5},
        {from: 4, to: 5},
        {from: 4, to: 6},
        {from: 3, to: 6},
        {from: 3, to: 4},
    ]
};

const graph3 = {
    nodes: [
        { id: 1, name: "Task#1" },
        { id: 2, name: "Task#2" },
        { id: 3, name: "Task#3" },
        { id: 4, name: "Task#4" },
        { id: 5, name: "Task#5" },
        { id: 6, name: "Task#6" },
        { id: 7, name: "Task#7" },
        { id: 8, name: "Task#8" },
        { id: 9, name: "Task#9" },
        { id: 10, name: "Task#10" },
        { id: 11, name: "Task#11" },
    ],
    edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 4, to: 8},
        {from: 5, to: 6},
        {from: 5, to: 9},
        {from: 6, to: 7},
        {from: 6, to: 10},
        {from: 10, to: 7},
        {from: 7, to: 8},
        {from: 9, to: 6},
        {from: 9, to: 11},
        {from: 11, to: 10},
    ]
};

const TestDataGraphs = [graph0, graph1, graph2, graph3];

export default TestDataGraphs;


