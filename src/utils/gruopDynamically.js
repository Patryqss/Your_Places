//a function for grouping arrays into categories
// eslint-disable-next-line no-extend-native
export default Array.prototype.groupDynamically = function (prop) {
    return this.reduce(function (groups, item) {
      let val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };