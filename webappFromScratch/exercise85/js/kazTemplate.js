//inspired by http://ejohn.org/blog/javascript-micro-templating/

//module pattern
var kazTemplate = (function() {
  var htmlContainer;

  //regex that wants all the <{variable}>
  var regexTemplate = /<{[^%>]+}>/g;

  //regex that wants a for loop
  var regexForLoop = /(^( )?(for|else|switch|case|break|{|}))(.*)?/g;

  function init(container, template, data) {
    htmlContainer = document.querySelector(container);
    parsing(template, data);
  }

  function parsing(template, data) {
    var match;
    var code = 'var array = [];';
    var currectPosition = 0;
    while(match = regexTemplate.exec(template)) {
      match.noRegex = kazUtils.replaceFromString(match[0], ['<{', '}>'], '');
      code += addToCode(template.slice(currectPosition, match.index), false);
      code += addToCode(match.noRegex, true);

      currectPosition = match.index + match.noRegex.length;

      template = template.replace(match[0], match.noRegex, false);
    }

    code += addToCode(template.substr(currectPosition, template.length - currectPosition));
    code += 'return array.join("");';

    code = code.replace(/(\r\n|\n|\r)/gm,'');

    template = new Function('', code).call(data);

    render(template);
  }

  function render(template) {
    htmlContainer.innerHTML = template;
  }

  function addToCode(str, variable) {
    return (variable) ? (str.match(regexForLoop) ? str + '\n' : 'array.push(' + str + ');') : 'array.push("' + str.replace(/"/g, '\\"') + '");';
  }

  return {
    init: init
  }
}());