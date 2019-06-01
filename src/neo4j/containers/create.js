// CREATE - creates a new element or elements
// params : string, node or node-rel-node, or array of them
// options : "", [{}], {}

/*
Direct example

Cypher :
  CREATE (u:User { name: "Olga" })-[:IS_A]->(j:Job { title: "Design Engineer" })

Amigo4j :
  .create()
    .node()
    .rel()
    .node()
*/


import { isObject } from '../../lib';


export default class Create {
  constructor() {}

  create(params, optional=false, unique=false) {
    if (optional) this.add('OPTIONAL');
    this.add('CREATE');

    if (params) {
      if (Array.isArray(params)) {
        // multiple item matches
        this.add(params.map(param => this.itemHandler(param)).join(", "));
        return this;
      } else if (isObject(params)) {
        // single match item
        this.node(params);
      } else if (typeof params === "string") {
        this.add(params);
      } else {
        throw `create() method must take string, object or array, not ${typeof params} : ${params}`;
      }
    }

    if (unique) this.add('UNIQUE');

    return this;
  }

}
