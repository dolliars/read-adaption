/* Change the text in the replacementContainer element to selected verbosity */

const replacementContainer = document.getElementById('replacement-container');

document.querySelectorAll('input[name="toggleText"]').forEach((element) => {
  element.addEventListener("change", function(event) {

    if(this.id === '0-curt') {
      const sentence = replaceText('0-curt'); // returns sting 'When implenting..'

      // Create new paragraph element and add the sentence
      let pElement = document.createElement('p');

      pElement.innerHTML = sentence;
      replacementContainer.innerHTML = "";
      replacementContainer.appendChild(pElement);

    } else if (this.id === '1-abbr') {
      replacementContainer.innerHTML = "";
      let text = replaceText('1-abbr');
      replacementContainer.appendChild(text);
    } else if (this.id === '2-verbose') {
      // Empty container content and add new content
      replacementContainer.innerHTML = "";
      let text = replaceText('2-verbose');
      replacementContainer.appendChild(text);
    } else {
      // Empty container content and add new content
      replacementContainer.innerHTML = "";
      replaceText('0-curt');
    }
  });
});

/*
 * arr0 is for the most curt sentence
 * arr1 is for when we add abbr tag
 * arr2 is the most verbose text
 * */

const arr0 = ["CDC", "ETL", "SLO", "SLA"];
const arr1 = ["Change Data Capture", "Extract Transform Load", "Service Level Objective", "Service Level Agreement"];
const arr2 = ["Change Data Capture (CDC)", "Extract Transform Load (ETL)", "Service Level Objective (SLO)", "Service Level Agreement (SLA)"];

// The regex to get all the marks in the text
const regex = /\[mark\d+\]/ig;

// The sample text
let markedText = "When implementing [mark0] as the backbone of your [mark1] pipeline, it's important that you consider having an [mark2] in your [mark3].";

function replaceText(level) {
  let splitParag = markedText.split(regex);
  let mergedText = "";

  if(level === '0-curt') {
    let result = [splitParag, arr0]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b));

    let newSentence = result.join('');
    return newSentence;

  } else if (level === '1-abbr') {
    let newLine = '<p>';

    for (let i = 0; i < splitParag.length; i++) {
      if (i !== splitParag.length - 1 ) {
        newLine = newLine + splitParag[i];
        newLine = newLine + '<abbr title="' + arr1[i] + '">' + arr0[i] + '</abbr>'
      } else {
        newLine = newLine + splitParag[i] + '</p>';
      }
    }

    return newElement = stringToHTML(newLine);

  } else if (level === '2-verbose') {
    let newLine = '<p>';

    for (let i = 0; i < splitParag.length; i++) {
      if (i !== splitParag.length - 1 ) {
        newLine = newLine + splitParag[i] + '<span class="replaced-text">' + arr2[i] + '</span>'
      } else {
        newLine = newLine + splitParag[i] + '</p>';
      }
    }

    return newElement = stringToHTML(newLine);

  }
}

/**
 * Convert string into an HTML DOM node
 *
 * @param  {String} str The text string
 * @return {Node}       the HTML node
 */
let stringToHTML = function (str) {
  let parser = new DOMParser();
	let doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};
