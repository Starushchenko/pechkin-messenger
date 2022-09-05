import {TIndexedObject} from '../../types/common';

export const isObject = (object: TIndexedObject | unknown):object is TIndexedObject => {
  return typeof object === 'object' && object !== null
}

export const isEqual = (lhs: object, rhs: object): boolean => {
  if (lhs === rhs) {
    return true;
  }

  if (!isObject(lhs) || !isObject(rhs)) {
    return false;
  }

  const keysA = Reflect.ownKeys(lhs);
  const keysB = Reflect.ownKeys(rhs);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Reflect.has(rhs, keysA[i]) ||
      !isEqual(lhs[keysA[i] as string], rhs[keysA[i] as string])
    ) {
      return false;
    }
  }

  return true;
}

export function merge(lhs: TIndexedObject, rhs: TIndexedObject): TIndexedObject {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }
    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as TIndexedObject, rhs[p] as TIndexedObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch(e) {
      lhs[p] = rhs[p];
    }

  }
  return lhs;
}

export function set(object: TIndexedObject | unknown, path: string, value: unknown): TIndexedObject | unknown {
  if (!isObject(object)) {
    return object;
  }

  const arr = path.split('.');
  const newObject = arr.reduceRight((acc: TIndexedObject, key: string, index: number): TIndexedObject => {
    if (index === arr.length - 1) {
      acc[key] = value as TIndexedObject;
      return acc;
    }
    return {
      [key]: acc
    } as TIndexedObject;
  }, {})

  return merge(object, newObject);
}
