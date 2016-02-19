//The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
export function addEvent(el, ev, fn) {
  if(el.addEventListener ) el.addEventListener(ev, fn, false);
  else if(el.attachEvent) el.attachEvent( "on" + ev, fn);
  else el["on" + ev] = fn;
}

//check if the arrays are the same length
export function isSameArrayLength(arrayA, arrayB) {
  return (arrayA.length === arrayB.length);
}

//gets random array item
export function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//check if the objects are the same
export function isSameObject(objectA, objectB) {
  return ((objectA === objectB) ? true : false);
}
//check if string has chars
export function containsChars(str, charsArray) {
  var foundArray = [];
  charsArray.forEach(function(char) {
    (str.indexOf(char) > -1) ? foundArray.push(true) : '';
  });
  return this.isSameArrayLength(charsArray, foundArray);
}
//replaces a string with charsArray to replaceTo
export function replaceFromString(str, charsArray, replaceTo) {
  charsArray.forEach(function(char) {
    str = str.replace(char, replaceTo);
  });
  return str;
}
//slices a string
export function slice(str, startIndex, endIndex) {
  return str.slice(startIndex, endIndex);
}
//subStr a string
export function subStr(str, startIndex, endIndex) {
  return (endIndex) ? str.substr(startIndex, endIndex) : str.substr(startIndex);
}
//finds if regex matches str
export function findRegexMatches(str, regex) {
  return str.match(regex);
}
//get an element from the document
export function getDocumentElement(selector) {
  return document.querySelector(selector);
}