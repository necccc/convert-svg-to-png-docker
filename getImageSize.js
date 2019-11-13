const url = require('url');
const fetch = require('isomorphic-unfetch');
const sizeOf = require('image-size');

module.exports = async (imageUrl) => {
  const res = await fetch(imageUrl)
  const img = await res.arrayBuffer()
  const buf = Buffer.from(img)
  const size = await sizeOf(buf)

  return size
}
