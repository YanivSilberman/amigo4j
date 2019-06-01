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


export default class OrderBy {
  constructor() {}

  orderBy(params, desc=false){
    this.add('ORDER BY');

    if (params) {
      if (Array.isArray(params)) {
        // multiple item matches
        this.add(params.map(i => {
          if (typeof i === "string") {
            return i;
          } else {
            throw `orderBy() method must take array of strings, not ${typeof i}`;
          }
        }).join(", "));
      } else if (typeof params === "string") {
        this.add(params);
        if (desc) {
          this.add('DESC');
        }
      } else {
        throw `orderBy() method must take array or string, not ${typeof params}`;
      }
    }

    return this;
  }

}
