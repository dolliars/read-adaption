/* Change the text in the replacementContainer element to selected verbosity */

const replacementContainer = document.getElementById('replacement-container');

document.querySelectorAll('input[name="toggleText"]').forEach((element) => {
  element.addEventListener("change", function(event) {

    if(this.id === '0-curt') {
      const sentence = replaceText('0-curt'); // returns sting 'When implenting..'

      // Create new paragraph element and add the sentence
      let pElement = document.createElement('p');
      pElement.innerHTML = sentence;

      // Empty container content and add new content
      replacementContainer.innerHTML = "";
      replacementContainer.appendChild(pElement);

    } else if (this.id === '1-abbr') {
      replaceText('1-abbr');
    } else if (this.id === '2-verbose') {
      replaceText('2-verbose');
    } else {
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
    result = [splitParag, arr0]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b));

    let newSentence = result.join('');
    return newSentence;

  } else if (level === '1-abbr') {
    //TODO
    // text will be  in <p> tag and in <abbr title="bla">bla</abbr> bla </p>
  } else if (level === '2-verbose') {
    //TODO
    // text in <p>bla bla <span class="replaced-text">blaa</span> blabla </p>
  }
}
