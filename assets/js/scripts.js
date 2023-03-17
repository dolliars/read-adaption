/* Change the text in the replacementContainer element to selected verbosity */

let replacementContainer = document.getElementById('replacement-container');

document.querySelectorAll('input[name="toggleText"]').forEach((element) => {
  element.addEventListener("change", function(event) {
    if(this.id === '0-curt') {
      replaceFormatText('0-curt'); 
      replacementContainer.innerHTML = 'ok then';
    } else if (this.id === '1-abbr') {
      replaceFormatText('1-abbr');
      replacementContainer.innerHTML = 'atchoum!';
    } else if (this.id === '2-verbose') {
      replaceFormatText('2-verbose');
      replacementContainer.innerHTML = 'so many words, so little time';
    } else {
      replaceFormatText('0-curt');
      replacementContainer.innerHTML = 'ok then again';
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
let markedText = "When implementing [mark0] as the backbone of your [mark1] pipeline, it's important that you consider having an [mark2] in your [mark3]";

function replaceFormatText(level) {
  let splitParag = markedText.split(regex)

  if(level === '0-curt') {
    console.log(level);
  // text in <p> tag
  // <p> blabla insert marked replacement balbla</p>
  } else if (level === '1-abbr') {
    console.log(level);
  // text in <p> and <abbr> tags
  // <p> tag and replaced text in  in <abbr title="bla">bla</abbr> bla </p>
  //
  } else if (level === '2-verbose') {
    console.log(level);
  // text in <p> and <span> tags
  // <p>bla bla <span class="replaced-text">blaa</span> <span class="replaced-text">Serv</span></p>
  }
}
