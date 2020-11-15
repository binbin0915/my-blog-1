 
const key = '_key';
 
export function getInfo() {
  return localStorage.getItem(key)
}

export function setInfo(value) {
  localStorage.setItem(key,value)
}

export function removeInfo() {
  localStorage.removeItem(key)
}
 