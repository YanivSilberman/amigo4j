import { not, exists } from './components/conditions';

// WHERE - adds constraints to the patterns in a MATCH or
  // OPTIONAL MATCH clause or filters the results of a WITH clause.

// params : string

/*
Direct example

Cypher :
  WHERE NOT exists(n.name) OR u.name STARTS WITH "y"

Amigo4j :
  .where(not(exists("n", "name")))
    .or(amigo4.startsWith("u", "name")("y"))

*/


export default class Where {
  constructor() {}

  where(...params) {
    this.add('WHERE');

    if (params && params.length > 0) {
      this.add(params.reduce((acc, cur) => {
        if (!cur || typeof cur !== "string")
          throw(`where params must be strings, not ${typeof cur}`);

        return acc + cur + ' ';
      }, ``))
    }

    return this;
  }

  whereNot(...params) {
    return this.where(not(), ...params);
  }

  whereExists(params) {
    return this.where(exists(params));
  }

  whereNotExists(params) {
    return this.whereNot(exists(params));
  }

}
