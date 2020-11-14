export default function cleanObject (object: {}) {
  return JSON.parse(JSON.stringify(object))
}
