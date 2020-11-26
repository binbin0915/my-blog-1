import storageUtil from './storage'
const key = '_key';

export function getInfo () {
    return storageUtil.get(key) || '{}';
}

export function setInfo (value) {
    return storageUtil.set(key, value);
}

export function removeInfo () {
    return storageUtil.set(key, '{}');
}
