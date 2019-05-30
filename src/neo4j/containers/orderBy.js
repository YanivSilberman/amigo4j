// ORDER BY - sub-clause following RETURN or WITH,
  // and it specifies that the output should be sorted and how

/*
Direct example

Cypher :
  ORDER BY n.name DESC

Amigo4j :
  .orderBy("n.name")
    .desc()

  .orderBy([
    { variable: "n.name", desc: true },
    "n.id"
  ])
*/


import { isObject } from '../../lib';

export default class OrderBy {
  constructor() {}

  /*
  orderBy(params){
    this.add('WITH')

    if (params) {
      if (Array.isArray(params)) {
        // multiple item matches
        this.add(params.map(i => {
          if (typeof i === "string") {
            return i;
          } else if (isObject(i)) {
            return this.withObjectHandler(i);
          } else {
            throw `with() method must take array of strings or objects, not ${typeof i}`;
          }
        }).join(", "));
      } else if (typeof params === "string") {
        this.add(params);
      } else if (isObject(params)) {
        this.add(this.withObjectHandler(params));
      } else {
        throw `with() method must take array or string, not ${typeof params}`;
      }
    }

    return this;
  }

  orderByValidate(item) {
    // if item isn't object,
    if (!isObject(item)) throw(`With item is not an object: ${item}`)
    // if item variable isn't right
    if (!item.variable || typeof item.variable !== "string")
      throw(`Item variable is non existent or improper: ${item.variable}`);
    // if item.as exists but is wrong
    if (item.as && typeof item.as !== "string")
      throw(`Item as is non existent or improper: ${item.as}`);
  }
  */
}
