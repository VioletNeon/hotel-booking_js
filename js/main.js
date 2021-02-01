const getAnyNumber = function(from, to) {
  let difference = Math.abs(to - from);
  if (from >= to) {
    return Math.floor(Math.random() * (difference + 1) + to);
  }
  return Math.floor(Math.random() * (difference + 1) + from);
}

const getFractionalNumber = function(from, to, pointer) {
  let difference = Math.abs(to - from);
  if (from >= to) {
    return +(Math.random() * (difference) + to).toFixed(pointer);
  }
  return +(Math.random() * (difference) + from).toFixed(pointer);
}

alert(getAnyNumber(5, 7));
alert(getFractionalNumber(5.5, 7.7, 3));
