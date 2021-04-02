import './App.css';
import React, {useRef, useState} from 'react';
import LeaderLine from "leader-line-new";
import setGraph from "./set-graph/set-graph";
import TestDataGraphs from "./test-data";

function App() {
  const graphInfo = setGraph(TestDataGraphs[3]);
  const nodeRefs = useRef([]);
  nodeRefs.current = [];


  const addToNodeRefs = (el) => {
    (el && !nodeRefs.current.includes(el)) && nodeRefs.current.push(el);
    if(nodes.length === nodeRefs.current.length){
      for (let edge of graphInfo.graphInputData.edges){
        new LeaderLine(
            nodeRefs.current.find(x => x.id === `node${edge.from}`),
            LeaderLine.pointAnchor(nodeRefs.current.find(x => x.id === `node${edge.to}`), {x: 0, y:Math.floor(Math.random() * 30)}),{
              startSocketGravity: [0, -20],
              endSocketGravity: [0, 0],
              size: 2
            })
      }

    }
  };

  const nodes = graphInfo.graphProcessedData.map(node => {
    const name = graphInfo.graphInputData.nodes.find(x => x.id === node.nodeId).name;
    const styles = {
      top: `${node.verticalLvl * 90}px`,
      left: `${((node.horizontalLvl+1)+node.coef)*100}px`
    };
      return <div style={styles} className="node" key={node.nodeId} id={`node${node.nodeId}`} ref={addToNodeRefs}>{name}</div>
});

  return (
    <div className="App">
      {nodes}
    </div>
  );
}

export default App;
