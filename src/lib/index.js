
export const linkDirection = {
  left: 'left',
  right: 'right'
};

export const matchTypes = {
  rel: 'rel',
  node: 'node',
  link: 'link'
};

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

export const insertBetween = (insert) => (a, b) => `${toString(a)} ${insert} ${toString(b)}`;
export const wrapWith = wrapper => (a) => `${wrapper}(${toString(a)})`;
export const placeBefore = placer => (a) => `${placer} ${a && toString(a) || ``}`;
export const placeAfter = placer => (a) => `${toString(a)} ${placer}`;
