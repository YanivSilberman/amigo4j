import * as conditions from './components/conditions';
import { isObject, linkDirection, matchTypes } from '../lib';

import Match from './match';
import Return from './return';
import With from './with';
import Unwind from './unwind';
import As from './as';
import Where from './where';

/*

Core functions used by almost all others, handles the types
of Neo4j elements, creating their params, validating their params,
and converting the params to string

*/

class Core {
  constructor() {
    this.linkDirection = linkDirection;
    this.matchTypes = matchTypes;
  }

  // general concat function
  add(str) {
    if (!str || typeof str !== "string")
      throw(`add params must be string... ${str} : ${typeof str}`);

    this.query = this.query + ' ' + str;
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
    }

    const node = () => {
      nodeOrRel();
      if (params && params.label && !this.schema.hasOwnProperty(params.label))
        throw(`Node label not in schema: ${params.label}`);
    };

    const rel = () => {
      nodeOrRel();
      if (params && params.label && !this.rels.hasOwnProperty(params.label))
        throw(`Rel label not in rels: ${params.label}, ${this.rels}`);
    };

    const link = () => {
      // direction: string || undefined
      if (params && params.direction && !this.linkDirection.hasOwnProperty(params.direction))
        throw('Link direction must be this.linkDirection left or right')
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

  relHandler({ variable, label, args, right, left }) {
    let add = '';
    add = left ? add + '<-' : (right ? add + '-' : add);
    add = add + '[';
    add = add + (variable || '');
    add = add + (label && `:${label}` || '');
    add = add + (args && `(${JSON.stringify(args)})` || '');
    add = add + (']');
    add = right ? add + '->' : (left ? add + '-' : add);
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

  nodeById(id, identifier, variable=undefined){
    if (!id || typeof id !== "string")
      throw(`nodeById must take a string id as first parameter, not: ${id}`);

    this.add(this.nodeHandler({
      type: this.matchTypes.node,
      args: { [identifier && identifier || "id"]: id },
      variable
    }))

    return this;
  }

  node(nodeParams) {
    this.validate(nodeParams).node();

    this.add(this.nodeHandler({
      type: this.matchTypes.node,
      ...nodeParams
    }))

    return this;
  }

  rel(relParams) {
    this.validate(relParams).rel();

    this.add(this.relHandler({
      type: this.matchTypes.rel,
      ...relParams
    }))

    return this;
  }

  link(linkParams) {
    this.validate(linkParams).link();

    this.add(this.linkHandler({
      type: this.matchTypes.link,
      ...linkParams
    }));

    return this;
  }
}

// add component functions, but put results in query and return this
for (let key of Object.keys(conditions)) {
  Core.prototype[key] = function(...params) {
    this.add(conditions[key](...params));
    return this;
  }
}

export default [
  Core,
  Match,
  Return,
  With,
  Unwind,
  As,
  Where
];
