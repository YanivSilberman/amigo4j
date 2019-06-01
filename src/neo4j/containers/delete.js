// DELETE - deletes stuff
// params : string, detach or not

/*
Direct example

Cypher :
  DETACH DELETE u

Amigo4j :
  .delete('u', true)
*/


import { isObject } from '../../lib';


export default class Delete {
  constructor() {}

  delete(params, detach=false) {

    if (detach) this.add('DETACH');
    this.add('DELETE');

    if (params) {
      if (typeof params === "string") {
        this.add(params);
      } else {
        throw `delete() method must take string, not ${typeof params} : ${params}`;
      }
    }

    return this;
  }

}
