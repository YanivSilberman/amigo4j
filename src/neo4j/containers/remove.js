// LIMIT - used to remove properties from nodes and relationships, and to remove labels from nodes.

/*
Direct example

Cypher :
  REMOVE n:Name

Amigo4j :
  .remove('n:Name')
*/


export default class Remove {
  constructor() {}

  remove(params){
    this.add('REMOVE');

    if (params) {
      if (typeof params === "string") {
        this.add(params);
      } else {
        throw(`remove() method must take string, not ${typeof params}`);
      }
    }

    return this;
  }

}
