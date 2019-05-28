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

    this.linkDirection = {
      left: 'left',
      right: 'right'
    }

    this.matchTypes = {
      rel: 'rel',
      node: 'node',
      link: 'link'
    }
  }

  // resets query and return final value
  return() {
    const ret = this.query;
    this.query = '';
    return ret;
  }

  // enforces query is reset
  run() {
    this.query = '';
    return this;
  }

  // create Object methods

  node(nodeParams) {
    // TODO: validate params here
    return {
      type: this.matchTypes.node,
      ...nodeParams
    }
  }

  rel(relParams) {
    // TODO: validate params here
    return {
      type: this.matchTypes.rel,
      ...relParams
    }
  }

  link(linkParams) {
    // TODO: validate params here
    return {
      type: this.matchTypes.link,
      ...linkParams
    }
  }
}


export default class Amigo4j extends aggregation(Base, ...Methods){};;
