import * as kazAjax from './kazAjax';
import * as kazUtils from './kazUtils';

//inspired by http://ejohn.org/blog/javascript-micro-templating/
const settings = {
  //regex that wants all the <{variable}>
  regexTemplate: /<{[^%>]+}>/g,
  //regex that wants a for loop - (c) Sijmen Vos
  regexForLoop: /(^( )?(for|else|switch|case|break|{|}))(.*)?/g
}

export function init(obj) {
  return new Promise((resolve, reject) => {
    if(!obj.container || !obj.template || !obj.data) return reject('The object has to have a container selector, a template string, and a data object');

    getDocElm(obj)
      .then(getTemplate)
      .then(parsTemplate)
      .then(renderTemplate)
      .then((response) => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

//get container element
function getDocElm(obj) {
  obj.container = kazUtils.getDocumentElement(obj.container);
  if(obj.container) return Promise.resolve(obj);
  return Promise.reject('Not a valid container selector!');
}

//get the template needed for this route
function getTemplate(obj) {
  return kazAjax.request('get', '../templates/' + obj.template, true)
    .then((response) => {
      obj.template = response;
      return Promise.resolve(obj);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

//pars the template with the data given by the controller
function parsTemplate(obj) {
  'use strict';
  let match;
  //start the string with a declaration of an array
  let templateCode = 'var array = [];';
  //hold the position of the 'mouse' on the template so that the computer knows where it is
  let currectPosition = 0;
  //run this loop when there is still a match and cache the match in the variable match
  while(match = settings.regexTemplate.exec(obj.template)) {
    //create an key with the value of the match without the <{}>
    match.noRegex = kazUtils.replaceFromString(match[0], ['<{', '}>'], '');
    //add een push to the code string with the text
    templateCode += addToCode(kazUtils.slice(obj.template, currectPosition, match.index), false);
    //add een push to the code string with the variable
    templateCode += addToCode(match.noRegex, true);

    //change the position of the 'mouse'
    currectPosition = match.index + match.noRegex.length;

    //change the template to the part without the <{}> so that the while loop isn't an inf loop
    obj.template = obj.template.replace(match[0], match.noRegex);
  }

  //add the end of the template to the code
  templateCode += addToCode(obj.template.substr(currectPosition, obj.template.length - currectPosition));
  //add en return join so that the function gives back the string needed
  templateCode += 'return array.join("");';
  //remove all the linebreakers in the code
  templateCode = templateCode.replace(/(\r\n|\n|\r)/gm,'');
  //populate the template with the string that is returned by the dynamic function IIFE
  obj.template = (new Function('data', templateCode))(obj.data);
  return Promise.resolve(obj);
}

function renderTemplate(obj) {
  obj.container.innerHTML  = obj.template;
  return Promise.resolve();
}

function addToCode(str, isJS) {
  return isJS ? (str.match(settings.regexForLoop) ? str + '\n' : 'array.push(' + str + ');\n') :
      (str != '' ? 'array.push("' + str.replace(/"/g, '\\"') + '");\n' : '');
}