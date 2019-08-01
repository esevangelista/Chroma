export const getSubtotal = (items, tally) => {
  return items.reduce((a, b) => a + ((b['price'] * tally.get(`${b['_id']}`)) || 0), 0);
};

export const getTotal = (items, tally) => {
  return items.reduce((a, b) => a + ((b['price'] * tally[`${b['_id']}`]) || 0), 0);
};


export const getUnique = (arr, comp) => {

  const unique = arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);
  return unique;
};
