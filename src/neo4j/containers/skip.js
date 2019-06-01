// SKIP - defines from which row to start including the rows in the output.

/*
Direct example

Cypher :
  SKIP 1

Amigo4j :
  .skip(1)
*/


import { toString } from '../../lib';

export default class Skip {
  constructor() {}

  skip(params){
    this.add('SKIP');

    if (params) {
      if (typeof params === "number") {
        this.add(toString(params));
      } else if (typeof params === "string") {
        this.add(params);
      } else {
        throw(`skip() method must take number or string, not ${typeof params}`);
      }
    }

    return this;
  }

}
