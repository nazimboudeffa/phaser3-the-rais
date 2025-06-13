class Graph {
    constructor() {
        this.locations = {};
    }

    addLocation(name) {
        if (!this.locations[name]) {
            this.locations[name] = { connections: [] };
        }
    }

    connectLocations(name1, name2) {
        if (this.locations[name1] && this.locations[name2]) {
            this.locations[name1].connections.push(name2);
            this.locations[name2].connections.push(name1);
        }
    }

    getConnections(name) {
        return this.locations[name] ? this.locations[name].connections : [];
    }

    displayGraph() {
        for (const location in this.locations) {
            console.log(`${location} is connected to: ${this.locations[location].connections.join(', ')}`);
        }
    }
}

export default Graph;