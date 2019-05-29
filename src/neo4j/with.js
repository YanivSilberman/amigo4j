// CREATE - allows query parts to be chained together
// params : "u", { variable: "u", as: "user" }, or [""], [{}]

/*
Direct example

Cypher :
  WITH u, count(*) as UserCount

Amigo4j :
  .with([ "u", { var: amigo4j.count("*"), as: "UserCount" } ])
*/


import { isObject } from '../lib';

export default class With {
  constructor() {}

  with(params){
    this.query = this.query + ' WITH ';

    if (Array.isArray(params)) {
      // multiple item matches
      this.query = this.query + params.map(i => {
        if (typeof i === "string") {
          return i;
        } else if (isObject(i)) {
          return this.withObjectHandler(i);
        } else {
          throw `with() method must take array of strings or objects, not ${typeof i}`;
        }
      }).join(", ");
    } else if (typeof params === "string") {
      this.query = this.query + `${params}`;
    } else if (isObject(params)) {
      this.query = this.query + this.withObjectHandler(params);
    } else {
      throw `with() method must take array or string, not ${typeof params}`;
    }

    return this;
  }

  withValidate(item) {
    // if item isn't object,
    if (!isObject(item)) throw(`With item is not an object: ${item}`)
    // if item variable isn't right
    if (!item.variable || typeof item.variable !== "string")
      throw(`Item variable is non existent or improper: ${item.variable}`);
    // if item.key exists but is wrong
    if (item.with && typeof item.with !== "string")
      throw(`Item with is non existent or improper: ${item.with}`);
  }

  /**
  * Takes item converts to cypher
  * @param item : "u", { var: "u", as: "user" }
  * @returns Cypher string
  */

  withObjectHandler(i) {
    console.log('withObjectHandler', i);
    this.withValidate(i);

    let ret = i.variable;

    if (i.as) {
      if (typeof i.as !== "string")
        throw `with() method must take string as second parameter, not ${typeof i.as}`;

      ret = ret + ` as ${i.as} `;
    }

    return ret;
  }
}
