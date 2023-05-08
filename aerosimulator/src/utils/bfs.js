import { airports } from './airports';
import { connections } from './connections';
 
const buildBfsTree = (start, end, graph) => {
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
    
    return trajectory.reverse();
}
  
export const main = (departureId, destinationId) => {
    return buildBfsTree(departureId, destinationId, connections);
}