/*

Neo4j Conditions:

  =, !=, exists(), STARTS WITH, ENDS WITH,


*/

import { insertBetween, wrapWith, placeBefore, placeAfter } from '../../lib';

// eg. equals('i.age', 15) ---> `i.age = 15`
export const equals = insertBetween('=');
export const notEquals = insertBetween('!=');
export const lt = insertBetween('<');
export const lte = insertBetween('<=');
export const gt = insertBetween('>');
export const gte = insertBetween('>=');
export const regexp = insertBetween('=~');

// eg. startsWith('y') ---> STARTS WITH y
export const startsWith = insertBetween('STARTS WITH');
export const endsWith = insertBetween('ENDS WITH');
export const contains = insertBetween('CONTAINS');
export const inList = insertBetween('IN');

// eg. exists('i.age') ---> `exists(i.age)`
export const exists = wrapWith('exists');
export const toLower = wrapWith('toLower');
export const type = wrapWith('type');
export const count = a => a && wrapWith('count')(a) || wrapWith('count')('*');

// eg. or('i.age > 15') ---> OR i.age > 15
export const or = placeBefore('OR');
export const not = placeBefore('NOT');
export const and = placeBefore('AND');
export const xor = placeBefore('XOR');
export const comma = placeBefore(',');

// eg. isNull('n.name') ---> n.name IS NULL
export const isNull = placeAfter('IS NULL');
