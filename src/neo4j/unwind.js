// UNWIND - expands a list into a sequence of rows


import { isObject, toString } from '../lib';

export default class Unwind {
  constructor() {}

  unwind(param, as){
    this.unwindValidate(param, as);
    this.add('UNWIND');

    if (param) {
      this.add(toString(param))
      if (as) {
        this.add(`AS ${as}`);
      }
    }

    return this;
  }

  unwindValidate(param, as) {
    // if param non existent,
    if (param === undefined) return;
    // if param non existent,
    if (as === undefined) return;
    // if as isn't right
    if (as && typeof as !== "string")
      throw(`Unwind as is improper, must be string: ${as}`);
  }

}
