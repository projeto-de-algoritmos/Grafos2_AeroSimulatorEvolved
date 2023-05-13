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

const main = () => {
    insertOnHeap({ airport: 11, distance: 11 });
    insertOnHeap({ airport: 10, distance: 10 });
    insertOnHeap({ airport: 8, distance: 8 });
    insertOnHeap({ airport: 9, distance: 9 });
    console.log(min_heap);
    removeFromHeap();
    console.log(min_heap);
}

main()