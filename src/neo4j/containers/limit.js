// LIMIT - constrains the number of rows in the output.

/*
Direct example

Cypher :
  LIMIT 1

Amigo4j :
  .limit(1)
*/


import { toString } from '../../lib';

export default class Limit {
  constructor() {}

  limit(params){
    this.add('LIMIT');

    if (params) {
      if (typeof params === "number") {
        this.add(toString(params));
      } else if (typeof params === "string") {
        this.add(params);
      } else {
        throw(`limit() method must take number or string, not ${typeof params}`);
      }
    }

    return this;
  }

}
