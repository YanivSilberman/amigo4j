// UNWIND - expands a list into a sequence of rows
// params : (param, as)

/*
Direct example

Cypher :
  UNWIND l as List
  UNWIND [1, 2, 3] as List

Amigo4j :
  .unwind("l", "List")
  .unwind([1, 2, 3], "List")
*/

import { isObject, toString } from '../lib';

export default class Unwind {
  constructor() {}

  unwind(param, as){
    this.unwindValidate(param, as);

    this.query =
      this.query  + ' UNWIND ' + toString(param) + ' AS ' + as;

    return this;
  }

  unwindValidate(param, as) {
    // if param non existent,
    if (param === undefined) throw(`Unwind param is undefined: ${param}`);
    // if param non existent,
    if (!as) throw(`Unwind as is undefined: ${as}`);
    // if as isn't right
    if (as && typeof as !== "string")
      throw(`Unwind as is improper, must be string: ${as}`);
  }

}
