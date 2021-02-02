const getFractionalNumber = function(from, to, pointer = 0) {
  [from, to, pointer] = [Math.abs(from), Math.abs(to), Math.abs(pointer)];
  if (from >= to) {
    [from, to] = [to, from];
  }
  return +(Math.random() * Math.abs(to - from) + from).toFixed(pointer);
}

alert(getFractionalNumber(1, 2, 2));
