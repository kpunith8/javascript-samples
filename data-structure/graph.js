export class Graph {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacentList = {};
  }

  addVertex(vertex) {
    this.adjacentList[vertex] = [];
    this.numberOfNodes++;
  }

  addEdge(vertex1, vertex2) {
    this.adjacentList[vertex1].push(vertex2);
    this.adjacentList[vertex2].push(vertex1);
  }

  showConnections() {
    const allNodes = Object.keys(this.adjacentList);
    for (let node of allNodes) {
      let nodeConnections = this.adjacentList[node];
      let connections = "";
      let vertex;
      for (vertex of nodeConnections) {
        connections += vertex + " ";
      }
      console.log(node + "-->" + connections);
    }
  }
}
