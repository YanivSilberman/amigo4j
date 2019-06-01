// MATCH - selects node or relationship or multiple
// params : node / rel / link or array of them
// options : [[]], [{}], {}

/*
Direct example

Cypher :
  MATCH (t:Team {id: "123"})<-[:IN_TEAM]-(u:User), (g:Group {name: "group123"})

Amigo4j :
  .match([
    [
      {
        type: amigo4j.matchTypes.node,
        variable: 't',
        label: amigo4j.labels.Team,
        args: { id: "123" }
      },
      {
        type: amigo4j.matchTypes.link,
        direction: amigo4j.linkDirection.left
      },
      {
        type: amigo4j.matchTypes.rel,
        label: amigo4j.labels.Team,
        args: { id: "123" }
      },
      {
        type: amigo4j.matchTypes.link
      },
      {
        type: amigo4j.matchTypes.node,
        variable: 'u',
        label: amigo4j.labels.User
      }
    ],
    {
      type: amigo4j.matchTypes.node,
      variable: 'g',
      label: amigo4j.labels.Group,
      args: { name: "group123" }
    }
  ])

*/

import { isObject } from '../../lib';

export default class Match {
  constructor() {
  }

  match(params) {
    this.add('MATCH');

    if (Array.isArray(params)) {
      // multiple item matches
      this.add(params.map(param => this.matchAdder(param)).join(", "));
      return this;
    } else if (isObject(params)) {
      // single match item
      this.add(this.matchAdder(params));
      return this;
    } else if (!params) {
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
      return this.itemHandler(i)
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

}
