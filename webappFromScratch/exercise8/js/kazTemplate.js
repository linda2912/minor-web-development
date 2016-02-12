//inspired by http://ejohn.org/blog/javascript-micro-templating/

//module pattern
var kazTemplate = (function() {
  var htmlContainer;
  var template;
  var data;

  //regex that wants all the <{variable}>
  var regexTemplate = /<{[^%>]+}>/g;

  //regex that wants a for loop - (c) Sijmen Vos
  var regexForLoop = /(^( )?(for|{|}))(.*)?/g;

  function init(container, template, data) {
    casheVars(container, template, data);
    parsing();
  }

  //cache the variables so all the functions can get them
  function casheVars(_container, _template, _data) {
    htmlContainer = document.querySelector(_container);
    template = _template;
    data = _data;
  }

  //pars the template with the data given by the controller
  function parsing() {
    var match;
    //start the string with a declaration of an array
    var code = 'var array = [];';
    //hold the position of the 'mouse' on the template so that the computer knows where it is
    var currectPosition = 0;
    //run this loop when there is still a match and cache the match in the variable match
    while(match = regexTemplate.exec(template)) {
      //create an key with the value of the match without the <{}>
      match.noRegex = kazUtils.replaceFromString(match[0], ['<{', '}>'], '');
      //add een push to the code string with the text
      code += addToCode(kazUtils.slice(template, currectPosition, match.index), false);
      //add een push to the code string with the variable
      code += addToCode(match.noRegex, true);

      //change the position of the 'mouse'
      currectPosition = match.index + match.noRegex.length;

      //change the template to the part without the <{}> so that the while loop isn't an inf loop
      template = template.replace(match[0], match.noRegex);
    }

    //add the end of the template to the code
    code += addToCode(template.substr(currectPosition, template.length - currectPosition));
    //add en return join so that the function gives back the string needed
    code += 'return array.join("");';
    //remove all the linebreakers in the code
    code = code.replace(/(\r\n|\n|\r)/gm,'');
    //populate the template with the string that is returned by the dynamic function 
    template = new Function('', code).call(data);

    render();
  }

  function render() {
    htmlContainer.innerHTML = template;
  }

  function addToCode(str, variable) {
    return (variable) ? (str.match(regexForLoop) ? str + '\n' : 'array.push(' + str + ');') : 'array.push("' + str.replace(/"/g, '\\"') + '");';
  }

  return {
    init: init
  }
}());