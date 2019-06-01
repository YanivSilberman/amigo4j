// SET - used to update labels on nodes and properties on nodes and relationships.

/*
Direct example

Cypher :
  SET u.age += 1
  SET (
    CASE
    WHEN n.age = 55
    THEN n END
  ).worksIn = 'Verdun'

Amigo4j :
  .set("u.age += 1")
  .set("u", "age", "+=", 1)

  .set(case('n.age = 55', 'n'), "worksIn", "=", "Verdun")
*/

import { toString } from '../../lib';

export default class Set {
  constructor() {}

  set(target, prop, operator, value){
    this.add('SET');

    if (target) {
      if (typeof target !== "string")
        throw(`set() target must be string, not ${typeof target}`);

      this.add(target);

      if (typeof prop === "string"){
        this.add(prop);
      }

      if (typeof operator === "string"){
        this.add(operator);
      }

      if (value) this.add(toString(value));
    }

    return this;
  }

}
