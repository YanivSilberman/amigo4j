// RETURN - verifies variables, returns variables and resets this.query
// params : "var" or ["var", "var2", ...]

/*
Direct example

Cypher :
  RETURN "user", "team"

Amigo4j :
  .return([ "user", "team" ])
*/

export default class Return {
  constructor() {}

  return(params) {
    this.add('RETURN');

    if (Array.isArray(params)) {
      if (params.some(i => typeof i !== "string"))
        throw("Return array param must be strings only")

      // multiple item matches
      this.add(params.join(", "));
      return this;

    } else if (typeof params === "string") {
      // single match item
      this.add(params);
      return this;

    } else {
      throw `return() method must take string or array, not ${typeof params}`
    }
  }

}
