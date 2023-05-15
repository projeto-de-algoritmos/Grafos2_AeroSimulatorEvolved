import { airports } from "./airports"
import { connectionDistances } from "./connectionDistances"

let min_heap = []

function parentNode (i) { return Math.floor((i - 1)/2) }

function leftNode (i) { return (2 * i + 1) }

function rightNode (i) { return (2 * i + 2) }

function elementFoundByIndex (i) { return (min_heap[i] !== undefined ? true : false) }

function getElementByIndex (i) { return (min_heap[i] !== undefined ? min_heap[i] : undefined) }

function swap (origin, destiny) {
    const aux = min_heap[origin];
    min_heap[origin] = min_heap[destiny];
    min_heap[destiny] = aux;
}

// Minimum heap operations

const shiftUp = (i) => {
    if(elementFoundByIndex(parentNode(i)) && getElementByIndex(parentNode(i)).distance > min_heap[i].distance) {
        swap(parentNode(i), i);
        shiftUp(parentNode(i));
    }
}

const heapify = (i) => {
    if(elementFoundByIndex(leftNode(i))) {
        var minElement = getElementByIndex(leftNode(i));
        var minElementIndex = leftNode(i);

        if (elementFoundByIndex(rightNode(i))
            && getElementByIndex(rightNode(i)).distance < minElement.distance) {
            minElement = getElementByIndex(rightNode(i));
            minElementIndex = rightNode(i);
        }

        if(getElementByIndex(i).distance < minElement.distance) return
        else {
            swap(i, minElementIndex);
            heapify(minElementIndex);
        }
    }
}

// Add and Remove elements from heap

const insertOnHeap = (element) => {
    min_heap.push(element);
    shiftUp(min_heap.length - 1);
}

const removeFromHeap = () => {
    if(elementFoundByIndex(0)) {
        let element = min_heap[0];
        swap(0, min_heap.length - 1);
        min_heap.pop();
        heapify(0);
        return element;
    } else return undefined;
}


const dijkstraHeap = (graph, startNode, endNode) => {
    const dist = {};
    const prev = {};
  
    insertOnHeap({ airport: startNode, distance: 0 });
  
    Object.keys(graph).forEach(airport => {
      if (airport === startNode) {
        dist[airport] = 0;
      } else {
        dist[airport] = Infinity;
      }
      prev[airport] = null;
    });
  
    while (min_heap.length > 0) {
      const { airport: currentNode, distance: currentDistance } = removeFromHeap();
  
      graph[currentNode].forEach(({ airport: neighborNode, distance: neighborDistance }) => {
        const newDistance = dist[currentNode] + neighborDistance;
  
        if (newDistance < dist[neighborNode]) {
          dist[neighborNode] = newDistance;
          prev[neighborNode] = currentNode;
          insertOnHeap({ airport: neighborNode, distance: newDistance });
        }
      });
    }
  
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      path.unshift(parseInt(currentNode));
      currentNode = prev[currentNode];
    }
  
    return { distance: dist[endNode], path };
  };
  
  const printPath = (graph, startNode, endNode) => {
      const { distance, path } = dijkstraHeap(graph, startNode.toString(), endNode.toString());
      console.log(path)
      console.log(`Distância total: ${distance}`);
  };

export const main = (departureId, destinationId) => {
    printPath(connectionDistances, departureId, destinationId);
    console.log(min_heap);
}

main()


