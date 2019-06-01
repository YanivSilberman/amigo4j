// MERGE - clause ensures that a pattern exists in the graph. Either the pattern already exists, or it needs to be created.

/*
Direct example

Cypher :
  FOREACH (n IN nodes(p)| SET n.marked = TRUE)


Amigo4j :
  .foreach('n IN nodes(p)| SET n.marked = TRUE')
  .foreach({ variable: 'n', list: 'nodes(p)', action: 'SET n.marked = TRUE'  })
*/



import { isObject } from '../../lib';


export default class Merge {
  constructor() {}

  merge(params) {
    this.add('MERGE');

    if (params) {
      if (Array.isArray(params)) {
        // multiple item matches
        this.add(params.map(param => this.itemHandler(param)).join(""));
        return this;
      } else if (isObject(params)) {
        // single match item
        this.node(params);
      } else if (typeof params === "string") {
        this.add(params);
      } else {
        throw `merge() method must take string, object or array, not ${typeof params} : ${params}`;
      }
    }

    return this;
  }

}
