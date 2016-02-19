import * as kazUtils from './kazUtils';

//inspired by http://ejohn.org/blog/javascript-micro-templating/
const settings = {
  //regex that wants all the <{variable}>
  regexTemplate: /<{[^%>]+}>/g,
  //regex that wants a for loop - (c) Sijmen Vos
  regexForLoop: /(^( )?(for|{|}))(.*)?/g,
}

function init(obj) {
  return new Promise((resolve, reject) => {
    if(!obj.container || !obj.template || !obj.data) return reject('The object has to have a container selector, a template string, and a data object');
    getDocElm(obj)
      .then(parsTemplate(obj))
      .then(renderTemplate(obj))
      .then((obj) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getDocElm(obj) {
  return new Promise((resolve, reject) => {
    obj.container = kazUtils.getDocumentElement(obj.container);
    if(obj.container) return resolve(obj);
    return reject('Not a valid container selector!');
  });
}

//pars the template with the data given by the controller
function parsTemplate(obj) {
  'use strict';
  return new Promise((resolve, reject) => {
    let match;
    //start the string with a declaration of an array
    let code = 'var array = [];';
    //hold the position of the 'mouse' on the template so that the computer knows where it is
    let currectPosition = 0;
    //run this loop when there is still a match and cache the match in the variable match
    while(match = settings.regexTemplate.exec(obj.template)) {
      //create an key with the value of the match without the <{}>
      match.noRegex = kazUtils.replaceFromString(match[0], ['<{', '}>'], '');
      //add een push to the code string with the text
      code += addToCode(kazUtils.slice(obj.template, currectPosition, match.index), false);
      //add een push to the code string with the variable
      code += addToCode(match.noRegex, true);

      //change the position of the 'mouse'
      currectPosition = match.index + match.noRegex.length;

      //change the template to the part without the <{}> so that the while loop isn't an inf loop
      obj.template = obj.template.replace(match[0], match.noRegex);
    }

    //add the end of the template to the code
    code += addToCode(obj.template.substr(currectPosition, obj.template.length - currectPosition));
    //add en return join so that the function gives back the string needed
    code += 'return array.join("");';
    //remove all the linebreakers in the code
    code = code.replace(/(\r\n|\n|\r)/gm,'');
    //populate the template with the string that is returned by the dynamic function 
    obj.template = new Function('', code).call(obj.data);
    return resolve(obj);
  });
}

function renderTemplate(obj) {
  obj.container.innerHTML = obj.template;
}

function addToCode(str, variable) {
  return (variable) ? (str.match(settings.regexForLoop) ? str + '\n' : 'array.push(' + str + ');') : 'array.push("' + str.replace(/"/g, '\\"') + '");';
}

export {init}
