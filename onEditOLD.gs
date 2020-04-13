var badWords = [
  "China",
  "Billion",
  "Products",
  "Democrat",
  "Great",
  "Dollars",
  "Tariffs",
  "Country",
  "Border",
  "Trade",
  "Deal"
];


function myOnEdit2(e) {
  if (!e) throw new Error( "Event object required. Test using test_onEdit()" );
  // e.value is only available if a single cell was edited
  if (e.hasOwnProperty("value")) {
    var tweets = [[e.value]];
  }
  else {
    tweets = e.range.getValues();
  }

  checkforword(e);
  var temp = Number(PropertiesService.getScriptProperties().getProperty('pos'));
  var colors = e.range.getBackgrounds();
  if(colors[temp][1] != '#0000ff') //is blue
  {
    Logger.log("Email Already Sent");
  }
  else
  {
    Logger.log("Tweet to send:  " + tweets[temp][0]);
    var score = countWords(tweets[temp][0])
    Logger.log("Score: "+score);
    var VolIndex = "Volfefe Index: " + score;
    var TweetToSend = tweets[temp][0];
    var Link = "http://bit.ly/2mg5RGm";
    Logger.log(TweetToSend);
    MailApp.sendEmail("3129272400@tmomail.net", "New Trump Tweet", "\n\n" + VolIndex + "\n\n\n" + TweetToSend);
    MailApp.sendEmail("3129278600@tmomail.net", "New Trump Tweet", "\n\n" + VolIndex + "\n\n\n" + TweetToSend);
    Logger.log("Done!");
    colors[temp][1] = '#90ee90'; //set green
    e.range.setBackgrounds(colors);
    SpreadsheetApp.getActiveSheet().getRange(temp+1,3).setValue(score);
    SpreadsheetApp.getActiveSheet().getRange(temp+1,4).setValue('=GOOGLEFINANCE("SPY","price")');
    removeFormulas();
  }

  //=GOOGLEFINANCE("GOOG","price")
}

function test_onEdit2() {
  var fakeEvent = {};
  fakeEvent.authMode = ScriptApp.AuthMode.LIMITED;
  fakeEvent.user = "hello@example.com";
  fakeEvent.source = SpreadsheetApp.getActiveSpreadsheet();
  fakeEvent.range = fakeEvent.source.getActiveSheet().getDataRange();
  // e.value is only available if a single cell was edited
  if (fakeEvent.range.getNumRows() === 1 && fakeEvent.range.getNumColumns() === 1) {
    fakeEvent.value = fakeEvent.range.getValue();
  }
  myOnEdit(fakeEvent);
}

// Installable trigger to handle change or timed events
// Something may or may not have changed, but we won't know exactly what
function playCatchUp(e) {
  // Build a fake event to pass to myOnEdit()
  var fakeEvent = {};
  fakeEvent.source = SpreadsheetApp.getActiveSpreadsheet();
  fakeEvent.range = fakeEvent.source.getActiveSheet().getDataRange();
  myOnEdit(fakeEvent);
}



function checkforword2(e) {
  if (!e) throw new Error( "Event object required. Test using test_onEdit()" );

  // e.value is only available if a single cell was edited
  if (e.hasOwnProperty("value")) {
    var tweets = [[e.value]];
  }
  else {
    tweets = e.range.getValues();
  }
  var colors = e.range.getBackgrounds();
  for (var i=0; i<tweets.length; i++) {
    var tweet = tweets[i][0];
    for (var j=0; j< badWords.length; j++) {
      var badWord = badWords[j];
      if (tweet.toUpperCase().match(badWord.toUpperCase()))
      {
        colors[i][0] = "red";
        if(colors[i][1] != '#90ee90')
        {
          colors[i][1] = "blue";
        }
        PropertiesService.getScriptProperties().setProperty('pos', i);
        break;
      }
    }
  }
  e.range.setBackgrounds(colors);
  PropertiesService.getDocumentProperties().setProperty("Last Processed Row",(e.range.getRowIndex()+tweets.length-1).toString());
}


function countWords2(text)
{

  var string = text;
  var score = 0;
  for (var z=0; z<badWords.length; z++) 
  {
    var substring = badWords[z];
    if(string.toUpperCase().indexOf(substring.toUpperCase()) !== -1)
    {
      score++;
    }
  }
return score;
}



function removeFormulas2() {
SpreadsheetApp.getUi().createMenu('Script')
    .addItem('Remove formulas', 'removeFormulas')
    .addToUi()
}

function removeFormulas2() {
    SpreadsheetApp.getActive().getSheets()
        .forEach(function (sh) {
            var r = sh.getDataRange()
            r.copyTo(r, {
            contentsOnly: true
        })
    })
}