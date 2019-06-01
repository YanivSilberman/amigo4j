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

    // save all relationships
    Object.keys(schema).map(node => {
      Object.keys(schema[node])
        .filter(prop => schema[node][prop].type === "RELATIONSHIP")
        .map(prop => {
          this.rels = {
            ...this.rels,
            [prop]: schema[node][prop],
            [schema[node][prop].relationship]: schema[node][prop]
          }
        })
    })

    this.query = '';
  }

  // enforces query is reset
  run() {
    this.query = '';
    return this;
  }
}

class Amigo4j extends aggregation(Base, ...Methods){}

export * from './src/neo4j/components/conditions';

export default ({ schema, schemaToMethods }) => {
  // TODO, validate schema

  // create custom methods for schema
  if (schemaToMethods) {
    for (let key of Object.keys(schema)) {
      Amigo4j.prototype[key] = function(variable, args) {
        this.node({ label: key, variable, args });
        return this;
      }

      const rels = Object.keys(schema[key])
        .filter(prop => schema[key][prop].type === "RELATIONSHIP")
        .map(prop => {
          Amigo4j.prototype[prop] = function(params) {
            this.rel({ label: schema[key][prop].relationship, ...params });
            return this;
          }
        })
    }
  }

  return new Amigo4j(schema);
}
