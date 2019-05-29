export const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object;
}

export const toString = str => {
  if (isObject(str)) {
    return JSON.stringify(str);
  } else if (Array.isArray(str)) {
    return JSON.stringify(str);
  } else if (typeof str == 'number') {
    return str.toString();
  } else if (str === null) {
    return ' NULL ';
  } else if (typeof str === "boolean") {
    if (str) {
      return " true ";
    } else {
      return " false ";
    }
  } else {
    return str;
  }
}
