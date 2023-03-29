/* Change the text in the replace-container element
 * to selected how verbose you want the text to be */

/* Set up for this example:
 *
 * arr0 items are the "original" marked words and results in shortest text
 * arr1 items results in the same sentence but the markup has the added <abbr> tag
 * arr2 is the most verbose text
 *
 * */

const arr0 = ['CDC', 'ETL', 'SLO', 'SLA']
const arr1 = ['Change Data Capture', 'Extract Transform Load', 'Service Level Objective', 'Service Level Agreement']
const arr2 = ['Change Data Capture (CDC)', 'Extract Transform Load (ETL)', 'Service Level Objective (SLO)', 'Service Level Agreement (SLA)']

// The regex to get all the marks in the text
const regex = /\[mark\d+\]/ig

// The sample text
const markedText = 'When using a vendor to implement [mark0] for your [mark1] pipeline, make sure to have an [mark2] in your [mark3].'

const splitTextArr = markedText.split(regex)
const replaceContainer = document.getElementById('replace-container')

document.querySelectorAll('input[name="textToggle"]').forEach((radioButton) => {
  radioButton.addEventListener('change', function (event) {
    // Empty container content to then add changed text
    replaceContainer.innerHTML = ''

    if (this.id === '0-terse') {
      replaceContainer.appendChild(changeText('0-terse'))
    } else if (this.id === '1-abbr') {
      replaceContainer.appendChild(changeText('1-abbr'))
    } else if (this.id === '2-verbose') {
      replaceContainer.appendChild(changeText('2-verbose'))
    } else {
      replaceContainer.appendChild(changeText('0-terse'))
    }
  })
})

const changeText = function (level) {
  if (level === '0-terse') {
    const zipArrs = [splitTextArr, arr0]
      .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
      .reduce((a, b) => a.concat(b))

    const pString = '<p>' + zipArrs.join('') + '</p>'
    const textElement = stringToHTML(pString)

    return textElement
  } else if (level === '1-abbr') {
    let pString = '<p>'

    for (let i = 0; i < splitTextArr.length; i++) {
      if (i !== splitTextArr.length - 1) {
        pString = pString + splitTextArr[i] + '<abbr title="' + arr1[i] + '">' + arr0[i] + '</abbr>'
      } else {
        pString = pString + splitTextArr[i] + '</p>'
      }
    }

    return stringToHTML(pString)
  } else if (level === '2-verbose') {
    let pString = '<p>'

    for (let i = 0; i < splitTextArr.length; i++) {
      if (i !== splitTextArr.length - 1) {
        pString = pString + splitTextArr[i] + '<span class="replaced-text">' + arr2[i] + '</span>'
      } else {
        pString = pString + splitTextArr[i] + '</p>'
      }
    }
    return stringToHTML(pString)
  }
}

/**
 * Convert string into an HTML DOM node
 *
 * @param  {String} str The text string
 * @return {Node}       the HTML node
 */
const stringToHTML = function (str) {
  const doc = new DOMParser().parseFromString(str, 'text/html')
  return doc.body.firstElementChild
}
