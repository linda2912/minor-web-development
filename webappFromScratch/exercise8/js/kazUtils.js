var kazUtils = {
  //The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
  addEvent: function(el, ev, fn) {
    if(el.addEventListener ) el.addEventListener(ev, fn, false);
    else if(el.attachEvent) el.attachEvent( "on" + ev, fn);
    else el["on" + ev] = fn;
  },
  //check if the arrays are the same length
  isSameArrayLength: function(arrayA, arrayB) {
    return (arrayA.length === arrayB.length);
  },
  //check if the objects are the same
  isSameObject: function(objectA, objectB) {
    return ((objectA === objectB) ? true : false);
  },
  //check if string has chars
  containsChars: function(string, charsArray) {
    var foundArray = [];
    charsArray.forEach(function(char) {
      (string.indexOf(char) > -1) ? foundArray.push(true) : '';
    });
    return this.isSameArrayLength(charsArray, foundArray);
  },
  removeFromString: function(string, charsArray) {
    charsArray.forEach(function(char) {
      string = string.replace(char, '');
    });
    return string;
  }
};