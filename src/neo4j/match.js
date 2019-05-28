import { isObject } from '../lib';
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

export default class Match {
  constructor() {
  }

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
      // variable: string || undefined, label: string || undefined, args: object || undefined
      if (item.variable && typeof item.variable !== 'string')
        throw('Item variable must be string or undefined');
      if (item.label && typeof item.label !== 'string')
        throw('Item label must be string or undefined')
      if (item.args && !isObject(item.args))
        throw('Item args must be obect or undefined');
      // if label isn't in schema
      if (item.label && !this.schema.hasOwnProperty(item.label))
        throw(`Item label not in schema: ${item.label}`)
    }
    // for link
    if (item.type === this.matchTypes.link) {
      // direction: string || undefined
      if (item.direction && !this.linkDirection.hasOwnProperty(item.direction)) throw('Item direction must be this.linkDirection left or right')
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

  nodeHandler({ variable, label, args }) {
    let add = '';
    add = '(';
    add = add + (variable || '');
    add = add + (label && `:${label}` || '');
    add = add + (args && ` (${JSON.stringify(args)})` || '');
    add = add + ')';
    return add;
  }

  relHandler({ variable, label, args }) {
    let add = '';
    add = '[';
    add = add + (variable || '');
    add = add + (label && `:${label}` || '');
    add = add + (args && `(${JSON.stringify(args)})` || '');
    add = add + (']');
    return add;
  }

  linkHandler({ direction }) {
    let add = '';
    if (direction) {
      if (direction === this.linkDirection.left) {
        add = add + '<-';
        return add;
      } else if (direction === this.linkDirection.right) {
        add = add + '->';
        return add;
      } else {
        throw('Wrong link type, must be left or right');
      }
    } else {
      add = add + '-';
      return add;
    }
  }
}
