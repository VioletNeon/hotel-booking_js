const getRandom = function (from, to, pointer = 0) {
  [from, to, pointer] = [Math.abs(from), Math.abs(to), Math.abs(pointer)];
  if (from >= to) {
    [from, to] = [to, from];
  }
  return +(Math.random() * Math.abs(to - from) + from).toFixed(pointer);
}

const getRandomArray = function (array) {
  return array.sort(function() {return Math.random() - 0.5}).slice(0, getRandom(0, array.length))
}

const getRandomElements = function (elements) {
  return elements[getRandom(0, elements.length - 1)]
}

export { getRandom, getRandomArray, getRandomElements };
