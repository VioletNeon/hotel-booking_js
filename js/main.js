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
    return +(+Math.random().toFixed(pointer) * (difference + Math.pow(10, -pointer)) + to).toFixed(pointer);
  }
  return +(+Math.random().toFixed(pointer) * (difference + Math.pow(10, -pointer)) + from).toFixed(pointer);
}

alert(getAnyNumber(2, 7));
alert(getFractionalNumber(2.1, 2.7, 2));
