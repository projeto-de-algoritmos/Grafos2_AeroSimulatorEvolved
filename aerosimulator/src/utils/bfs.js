import { airports } from './airports';
import { connectionDistances } from './connectionDistances';
import { connections } from './connections';
 
const buildBfsTree = (start, end, graph, graphDistances) => {
    const visited = new Array(Object.keys(graph).length).fill(false);
    const parents = new Array(Object.keys(graph).length).fill(null);

    const queue = [];
    queue.push(start);
    visited[start] = true;

    while (queue.length > 0) {
        const node = queue.shift();
        
        if (node === end) break;

        for(let neighbor of graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                parents[neighbor] = node;
                queue.push(neighbor);
            }
        }
    }

    let trajectory = [];
    let node = end;
    while (node !== null) {
        trajectory.push(airports[node].name);
        node = parents[node];
    }

    let distance = 0;
    let lastNode;
    node = end;
    while (parents[node] !== null) {
        lastNode = node;
        node = parents[node];
        graphDistances[node].forEach((connection) => {
            if (connection.airport === lastNode) distance += connection.distance
        })
    }
    
    return { distance: distance, trajectory: trajectory.reverse() };
}
  
export const main = (departureId, destinationId) => {
    return buildBfsTree(departureId, destinationId, connections, connectionDistances);
}