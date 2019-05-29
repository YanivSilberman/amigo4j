import { isObject } from '../lib/index';

import Match from './match';
import Return from './return';
import With from './with';
import Unwind from './unwind';

/*

Core functions used by almost all others, handles the types
of Neo4j elements, creating their params, validating their params,
and converting the params to string

*/

class Core {
  constructor() {
    this.linkDirection = {
      left: 'left',
      right: 'right'
    }

    this.matchTypes = {
      rel: 'rel',
      node: 'node',
      link: 'link'
    }
  }

  // validator function for nodes, rels, and links
  validate(params) {
    if (params && !isObject(params))
      throw(`Node, rel, and link params must be object or nothing: ${params}`);

    const nodeOrRel = () => {
      // variable: string || undefined, label: string || undefined, args: object || undefined
      if (params && params.variable && typeof params.variable !== 'string')
        throw('Item variable must be string or undefined');
      if (params && params.label && typeof params.label !== 'string')
        throw('Item label must be string or undefined')
      if (params && params.args && !isObject(params.args))
        throw('Item args must be obect or undefined');
      // if label isn't in schema
      if (params && params.label && !this.schema.hasOwnProperty(params.label))
        throw(`Item label not in schema: ${params.label}`)
    }

    const node = nodeOrRel;
    const rel = nodeOrRel;
    const link = () => {
      // direction: string || undefined
      if (params && params.direction && !this.linkDirection.hasOwnProperty(params.direction))
        throw('Item direction must be this.linkDirection left or right')
    }

    return { node, rel, link, nodeOrRel };
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

  // create Object methods

  node(nodeParams) {
    this.validate(nodeParams).node();

    return {
      type: this.matchTypes.node,
      ...nodeParams
    }
  }

  rel(relParams) {
    this.validate(relParams).rel();

    return {
      type: this.matchTypes.rel,
      ...relParams
    }
  }

  link(linkParams) {
    this.validate(linkParams).link();

    return {
      type: this.matchTypes.link,
      ...linkParams
    }
  }

  count(countParams) {
    return ` count(${countParams && countParams || ''}) `;
  }
}

export default [
  Core,
  Match,
  Return,
  With,
  Unwind
];
