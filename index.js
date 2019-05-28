import Methods from './src/neo4j';
import { isObject } from './src/lib';
import aggregation from './src/lib/aggregator';

class Base {
  constructor(schema) {
    if (!schema || !isObject(schema)) throw("Must pass schema (object) as param to Amigo4j class");

    this.schema = schema;
    this.labels = Object.keys(schema).reduce((acc, cur) => {
      acc[cur] = cur;
      return acc;
    }, {})

    this.query = '';
  }

  // enforces query is reset
  run() {
    this.query = '';
    return this;
  }
}


export default class Amigo4j extends aggregation(Base, ...Methods){};;
