// CREATE - creates a new element or elements
// params : node or node-rel-node, or array of them
// options : [{}], {}

/*
Direct example

Cypher :
  RETURN "user", "team"

Amigo4j :
  .return([ "user", "team" ])
*/


import { isObject } from '../../lib';


export default class Create {
  constructor() {}

  match(params) {
    this.query = this.query + 'MATCH ';

    if (Array.isArray(params)) {
      // multiple item matches
      this.query = this.query + params.map(param => this.matchAdder(param)).join(", ");
      return this;
    } else if (isObject(params)) {
      // single match item
      this.query = this.query + this.matchAdder(params);
      return this;
    } else {
      throw `match() method must take object or array, not ${typeof params}`
    }
  }

  /**
  * Takes item checks if params fit type and will work, throws if fail
  * @param item : { node/rel/link }
  * @returns true
  */

  matchValidate(item) {
    // if item isn't object throw,
    if (!isObject(item)) throw('Match item is not an object')
    // if item type isn't right
    if (!item.type || !this.matchTypes.hasOwnProperty(item.type))
      throw(`Item type is non existent or improper: ${item.type} !== ${Object.keys(this.matchTypes).join(" or ")}`)

    // for node or rel
    if (item.type === this.matchTypes.node || item.type === this.matchTypes.rel) {
      this.validate(item).nodeOrRel();
    }
    // for link
    if (item.type === this.matchTypes.link) {
      this.validate(item).link();
    }
  }


  /**
  * Takes item or chain, validates and converts to cypher
  * @param item : { node/rel/link } or [ { node/rel/link } ]
  * @returns string
  */

  matchAdder(item) {

    const convert = i => {
      this.matchValidate(i);
      return this.matchItemHandler(i)
    }

    if (Array.isArray(item)) {
      // chain
      return item.map(convert).join("");
    } else if (isObject(item)) {
      // single item
      return convert(item);
    } else {
      throw `match item must be object or array, not ${typeof item}`
    }

    return add;
  }

  /**
  * Takes item converts to cypher
  * @param item : { node/rel/link }
  * @returns Cypher string
  */

  matchItemHandler(i) {
    const { type, variable, label, args, direction } = i;

    if (type === this.matchTypes.rel) {
      return this.relHandler({ variable, label, args });
    } else if (type === this.matchTypes.node) {
      return this.nodeHandler({ variable, label, args });
    } else if (type === this.matchTypes.link) {
      return this.linkHandler({ direction });
    } else {
      throw('Wrong match type, use matchTypes.rel or matchTypes.node')
    }
  }



}
