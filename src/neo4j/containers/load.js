// LOAD - used to import data from CSV files.

/*
Direct example

Cypher :
  USING PERIODIC COMMIT 500
  LOAD CSV WITH HEADERS FROM 'https://....csv' AS line

Amigo4j :
  .usingPeriodicCommit(500)
    .loadCsv('https://....csv', true)
      .as('line')

  .loadCsv('https://...', true, 500)
    .as('line')
*/

import { toString } from '../../lib';

export default class Load {
  constructor() {}

  loadCsv(params, withHeaders=false, usingPeriodicCommit=false){
    if (usingPeriodicCommit) {
      if (typeof usingPeriodicCommit === "string" || typeof usingPeriodicCommit === "number") {
        this.add(`USING PERIODIC COMMIT ${toString(usingPeriodicCommit)}`);
      } else if (typeof usingPeriodicCommit !== "boolean") {
        throw `loadCsv() method must take string, number, or boolean as usingPeriodicCommit, not ${typeof usingPeriodicCommit}`;
      }
    }

    this.add('LOAD CSV');
    if (withHeaders) this.add('WITH HEADERS');
    this.add('FROM');

    if (params) {
      if (typeof params === "string") {
        this.add(params);
      } else {
        throw `loadCsv() method must take string, not ${typeof params}`;
      }
    }

    return this;
  }

  usingPeriodicCommit(params) {
    this.add('USING PERIODIC COMMIT');

    if (params) {
      if (typeof params === "string" || typeof params === "number") {
        this.add(toString(params));
      } else {
        throw `usingPeriodicCommit() method must take string, number as params, not ${typeof params}`;
      }
    }

    return this;
  }

}
