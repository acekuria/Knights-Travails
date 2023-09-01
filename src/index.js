const { default: QueueFactory } = require('queue-package/src/queue');

class Node {
  constructor(row, col, distanceFromStartPosition, parent = null) {
    this.row = row;
    this.col = col;
    this.distanceFromStartPosition = distanceFromStartPosition;
    this.parent = parent;
  }
}
const bfs = (start, end, queue) => {
  const neighbours = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  const visited = new Set();
  while (queue.size() > 0) {
    const currentNode = queue.dequeue();
    if (currentNode.row === end[0] && currentNode.col === end[1]) {
      const shortestPath = [];
      let current = currentNode;
      while (current.parent) {
        shortestPath.unshift([current.row, current.col]);
        current = current.parent;
      }
      return `You made it in ${
        currentNode.distanceFromStartPosition
      } moves\nHere's your path:\n${start}\n${shortestPath.join('\n')}`;
    }
    if (visited.has(currentNode));
    else if (
      currentNode.row < 0 ||
      currentNode.row > 7 ||
      currentNode.col < 0 ||
      currentNode.col > 7
    );
    else {
      visited.add(currentNode);
      for (const neighbour of neighbours) {
        queue.enqueue(
          new Node(
            currentNode.row + neighbour[0],
            currentNode.col + neighbour[1],
            currentNode.distanceFromStartPosition + 1,
            currentNode,
          ),
        );
      }
    }
  }
};

function getKnightShortestPath(start, end) {
  if (
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[1] < 0 ||
    end[1] > 7
  ) {
    return 'Invalid start/end position';
  }
  const queue = QueueFactory();
  queue.enqueue(new Node(start[0], start[1], 0));

  return bfs(start, end, queue);
}

console.log(getKnightShortestPath([3, 3], [4, 3]));
