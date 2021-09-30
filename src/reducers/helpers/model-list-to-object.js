/**
 * @param list Model list
 * @param primaryKey
 * @returns {{}}
 */
export default (list, primaryKey = 'id') => {
  const result = {};
  list.forEach((payload) => {
    const id = payload[primaryKey];
    result[id] = payload;
  });
  return result;
};
