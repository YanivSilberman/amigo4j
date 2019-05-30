// AS - follows up WITH and UNWIND and stores their output in a variable
// params : (param)

/*
Direct example

Cypher :
  AS user

Amigo4j :
  .as("user")
*/


export default class As {
  constructor() {}

  as(param) {
    if (!param || typeof param !== "string")
      throw(`as param must be string, not ${typeof param}`);

    this.query =
      this.query  + ' AS ' + param;

    return this;
  }

}
