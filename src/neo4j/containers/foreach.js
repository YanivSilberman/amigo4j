// FOREACH - used to update data within a list, whether components of a path, or result of aggregation.

/*
Direct example

Cypher :
  FOREACH (n IN nodes(p)| SET n.marked = TRUE)


Amigo4j :
  .foreach('n IN nodes(p)| SET n.marked = TRUE')
  .foreach({ variable: 'n', list: 'nodes(p)', action: 'SET n.marked = TRUE'  })
*/

import { isObject, toString } from '../../lib';

export default class Foreach {
  constructor() {}

  foreach(params){
    this.add('FOREACH');

    if (params) {
      if (typeof params === "string") {
        this.add(params);
      } else if (isObject(params)) {
        const { variable, list, action } = params;
        this.add(`(${variable} IN ${toString(list)} | ${action})`)
      } else {
        throw(`foreach() method must take string or object, not ${typeof params}`);
      }
    }

    return this;
  }

}
