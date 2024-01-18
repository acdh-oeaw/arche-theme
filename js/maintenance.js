/**
 * @file 404.js
 * Provides 404 content for ACDH Websites.
 *
 * @author Asil Cetin.
 */

// HTML content of the page
var pageContent =
{  
  "elements":[
    {  
      "tag":"div",
      "class":"error-image",
    },
    {  
      "tag":"h1",
      "class":"error-title",
      "content":"ARCHE is currently under maintenance. "
    },
    {  
      "tag":"p",
      "class":"error-description",
      "content":"We should be back shortly. Thank you for your patience. <br><br>We apologize for the inconvenience."
    },
    {  
      "tag":"a",
      "class":"acdh-logo",
      "href":"https://www.oeaw.ac.at/acdh/"
    },
    {  
      "tag":"a",
      "class":"button",
      "content":"Visit ACDH-CH Website",
      "href":"https://www.oeaw.ac.at/acdh/"
    },
    {  
      "tag":"a",
      "class":"button",
      "content":"Contact Us",
      "href":"mailto:acdh@oeaw.ac.at"
    }
  ]
}

var container = document.createElement("div")
container.className += "page-container";

// Append every element to the body of the page
for (i in pageContent.elements) {
  var element = document.createElement(pageContent.elements[i].tag)
  element.className += pageContent.elements[i].class;
  if (typeof pageContent.elements[i].content != "undefined") element.innerHTML = pageContent.elements[i].content;
  if (typeof pageContent.elements[i].href != "undefined") element.href = pageContent.elements[i].href;
  container.appendChild(element);
}

document.body.appendChild(container);


