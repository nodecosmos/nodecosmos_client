/**
 * @param list Model list
 * @param primaryKey
 * @returns {{}}
 */
export default (list, primaryKey = 'id') => {
  const result = {};
  list.forEach((payload) => {
    const id = payload[primaryKey];
    payload.micron_ids = payload.micron_ids || [];
    payload.x = payload.x || 0;
    payload.y = payload.y || 0;
    payload.xEnds = payload.xEnds || 0;
    payload.yEnds = payload.yEnds || 0;
    result[id] = payload;
  });
  return result;
};
