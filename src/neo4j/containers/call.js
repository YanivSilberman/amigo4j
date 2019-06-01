// CALL - used to call a procedure deployed in the database

/*
Direct example

Cypher :
   CALL db.propertyKeys() YIELD propertyKey AS prop

Amigo4j :
  .call("db.propertyKeys()")
    .yield("propertyKey")
      .as('prop')

*/


export default class Call {
  constructor() {}

  _call(params){
    this.add('CALL');

    if (params) {
      if (typeof params === "string") {
        this.add(params);
      } else {
        throw `call() method must take string, not ${typeof params}`;
      }
    }

    return this;
  }

  yield(params){
    this.add('YIELD');

    if (params) {
      if (typeof params === "string") {
        this.add(params);
      } else {
        throw `yield() method must take string, not ${typeof params}`;
      }
    }

    return this;
  }

}
