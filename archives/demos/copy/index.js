const shallowCopy = object => {
  // 只拷贝对象
  if (typeof object !== 'object') {
    return object;
  }

  // 判断是否数组
  const newObject = object instanceof Array ? [] : {};

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}

const deepCopy = object => {
  // 只拷贝对象
  if (typeof object !== 'object') {
    return object;
  }

  // 判断是否数组
  const newObject = object instanceof Array ? [] : {};

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      typeof object[key] === 'object' ? newObject[key] = deepCopy(object[key]) : newObject[key] = object[key];
    }
  }

  return newObject;
}

