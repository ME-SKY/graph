export default function setGraph({nodes, edges}) {

    let nodesWithPosition = [];
    let defaultStartNodeIds;
    let nodeIds = nodes.map(node => node.id);
    defaultStartNodeIds = nodeIds.filter(nodeId => !(edges.map(edge => edge.to).includes(nodeId)));

    function computeHorizontalLvls(prevNodeIds, horizontalLvl) {
        if (prevNodeIds && prevNodeIds.length > 0 && horizontalLvl !== undefined) {

            prevNodeIds.map((pnI) => {
                if (nodesWithPosition.findIndex(x => x.nodeId === pnI) === -1) {
                    let nextNodeIds = edges.filter(edg => pnI === edg.from).map(edg => edg.to);

                    nodesWithPosition.push({
                        nodeId: pnI,
                        next: nextNodeIds.length > 0 ? nextNodeIds : null,
                        horizontalLvl: horizontalLvl,
                        coef: coef(pnI)
                    });

                    if (nextNodeIds.length > 0) {
                        computeHorizontalLvls(nextNodeIds, horizontalLvl + 1);
                    }
                }
            })

        }
    }

    function coef(nodeId) {
        return edges.filter(x => x.to === nodeId).map(x => x.from).length;
    }

    computeHorizontalLvls(defaultStartNodeIds, 0);

    //set initial vertical lvls
    function setInitialVerticalLvls() {
        nodesWithPosition.map((x, i) => {x.verticalLvl = 0; x.index = i; x.touched = false});
        nodesWithPosition.forEach((el, ind, arr) => {

            if(!el.touched && el.next !== null){
                let nextEls = el.next.map(x => nodesWithPosition.find(y => y.nodeId === x));

                nextEls.map((x, i) => {
                    let index = nodesWithPosition.findIndex(y => y.nodeId === x.nodeId);
                    nodesWithPosition[index] = { ...nodesWithPosition[index], verticalLvl: i}
                });

               let theSamePositionLvlAndCoefNodes = nodesWithPosition.filter(x => x.coef === el.coef && x.horizontalLvl === el.horizontalLvl);
                theSamePositionLvlAndCoefNodes.map((x, i) => {
                    let index = nodesWithPosition.findIndex(y => y.nodeId === x.nodeId);
                    nodesWithPosition[index] = { ...nodesWithPosition[index],verticalLvl: i, asd: 'asd'}
                });
                el.touched = true;
            }
        })
    }

    //set vertical lvls
    function setVerticalLvls(nxtIds) {
        nxtIds.forEach(x => {
            let index =  nodesWithPosition.find(y => y.nodeId === x).index;
            let {verticalLvl, next} = nodesWithPosition[index];

            if(verticalLvl >= 1 && next !== null){

                let newNextIds = nodesWithPosition.map((el)=>{
                    if(next.includes(el.nodeId)){
                        if(el.next){
                            el.verticalLvl = verticalLvl;
                        }
                        return el.nodeId;
                    }
                });
                setVerticalLvls(newNextIds.filter(id => id))
            }})
    }

    //align vertical lvls
    function finishAlignVerticalLvls(startIds) {
        startIds.forEach((el,ind,arr) =>{
            let findedNode = nodesWithPosition.find(x => x.nodeId === el);
            if(findedNode.verticalLvl > 0 && findedNode.next){
                let nextNodes = findedNode.next.map(x => nodesWithPosition.find(y => y.nodeId === x));

                if(nextNodes.length > 1){
                    nextNodes.reduce((prev, curr, ind, arrr) => {
                        if(prev.index < curr.index && curr.verticalLvl === prev.verticalLvl && !curr.touched){
                            nodesWithPosition[curr.index].verticalLvl += 1;
                            nodesWithPosition[curr.index].touched = true;
                        }
                    });
                    finishAlignVerticalLvls(nextNodes.map(x => x.nodeId))
                }
            }
        })
    }

    //prepare other data
    if (nodesWithPosition.length > 0) {
        edges.forEach(edg => {
            let indexTo = nodesWithPosition.findIndex(x => x.nodeId === edg.to);
            let elFrom = nodesWithPosition.find(x => x.nodeId === edg.from);
            let elTo = nodesWithPosition[indexTo];

            if (elFrom.horizontalLvl === elTo.horizontalLvl) {
                nodesWithPosition[indexTo].coef = elFrom.coef === elTo.coef ? (elFrom.coef + 1) : nodesWithPosition[indexTo].coef;
            }

        });

        setInitialVerticalLvls();
        setVerticalLvls(defaultStartNodeIds);

        //reset touched nodes
        nodesWithPosition.map(x => x.touched = false);

        finishAlignVerticalLvls(defaultStartNodeIds)
    }

    return { graphInputData: {nodes, edges}, graphProcessedData: nodesWithPosition};
}
