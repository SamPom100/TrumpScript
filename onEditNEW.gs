function myOnEdit(e) 
{
  if (!e) throw new Error( "Event object required. Test using test_onEdit()" );
  
  if (e.hasOwnProperty("value"))
  {
    var tweets = [[e.value]];
  }
  else 
  {
    tweets = e.range.getValues();
  }

  var temp = Number(PropertiesService.getScriptProperties().getProperty('pos'));
  
  
  
  //=GOOGLEFINANCE("GOOG","price")
}

function test_onEdit() {
  var fakeEvent = {};
  fakeEvent.authMode = ScriptApp.AuthMode.LIMITED;
  fakeEvent.user = "hello@example.com";
  fakeEvent.source = SpreadsheetApp.getActiveSpreadsheet();
  fakeEvent.range = fakeEvent.source.getActiveSheet().getDataRange();
  if (fakeEvent.range.getNumRows() === 1 && fakeEvent.range.getNumColumns() === 1) {
    fakeEvent.value = fakeEvent.range.getValue();
  }
  myOnEdit(fakeEvent);
}

function playCatchUp(e)
{
  var fakeEvent = {};
  fakeEvent.source = SpreadsheetApp.getActiveSpreadsheet();
  fakeEvent.range = fakeEvent.source.getActiveSheet().getDataRange();
  myOnEdit(fakeEvent);
}



function checkforword(e) {
  if (!e) throw new Error( "Event object required. Test using test_onEdit()" );
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