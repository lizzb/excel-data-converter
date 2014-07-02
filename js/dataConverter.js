
//-----------------------------------------------------------------------------
// Controller
//-----------------------------------------------------------------------------


/*
DataConverter.prototype.insertSampleData = function() {
  this.inputTextArea.val("NAME\tVALUE\tCOLOR\nAlan\t12\tblue\nShan\t13\t\"green\tblue\"\nJohn\t45\torange\nMinna\t27\tteal");
}
*/


//-----------------------------------------------------------------------------
//
//   ON PAGE LOAD
//
//-----------------------------------------------------------------------------
$(document).ready(function(){


//-----------------------------------------------------------------------------
// Textarea element IDs
//-----------------------------------------------------------------------------

//
// Textarea element id's containing data to be converted
//
var inputMajors = document.getElementById('dataInput-majors'); //.value;
var inputPositions = document.getElementById('dataInput-positions'); //.value;
var inputBooths = document.getElementById('dataInput-booths'); //.value;

//
// Textarea element id's to insert converted data
//
var outputMajors = document.getElementById('dataOutput-majors'); //.value;
var outputPositions = document.getElementById('dataOutput-positions'); //.value;
var outputBooths = document.getElementById('dataOutput-booths'); //.value;
//-----------------------------------------------------------------------------


//inputTextArea.val("booth\troom\tfloor\nAlan\t12\tblue\nShan\t13\t\"green\tblue\"\nJohn\t45\torange\nMinna\t27\tteal");

var sample = "booth\tfloor\troom\n2\t1\tHeritage\n9\t1\tHeritage\n7\t1\tHeritage\n11\t1\tHeritage\n12\t1\tHeritage\n15\t1\tHeritage\n20\t1\tHeritage\n23\t1\tHeritage\n24\t1\tHeritage\n26\t1\tHeritage";

inputBooths.value = sample;

inputPositions.value = "name\tfriendlyName\ncoop\tCo-op\nFT\tFTE\nintern\tIntern";

//-----------------------------------------------------------------------------
// Data Converter Wrapper functions
// last param = prop quotes on or off
//-----------------------------------------------------------------------------
function convertDataMajors() { convertData(inputMajors, outputMajors, false)};
function convertDataPositions() { convertData(inputPositions, outputPositions, false)};
function convertDataBooths() { convertData(inputBooths, outputBooths, true)};


  $("#dataInput-majors").keyup(function()   { convertDataMajors(); });
  $("#dataInput-majors").change(function()  { convertDataMajors(); });

  $("#dataInput-positions").keyup(function()  { convertDataPositions(); });
  $("#dataInput-positions").change(function() { convertDataPositions(); });

  $("#dataInput-booths").keyup(function()   { convertDataBooths(); });
  $("#dataInput-booths").change(function()  { convertDataBooths(); });


  // hacky, temporary
  // http://gomakethings.com/ditching-jquery-for-vanilla-js/
  // want to get AWAY form jquery, use vanilla js

  
}) // DOCUMENT READY

//-----------------------------------------------------------------------------



//-----------------------------------------------------------------------------
//
// Data Conversion Settings
//
//-----------------------------------------------------------------------------

// http://gomakethings.com/ditching-jquery-for-vanilla-js/

// http://stravid.com/en/cleaner-javascript-code-with-enums/

var dataTypes = {
  MAJORS: 0,
  POSITIONS: 1,
  BOOTHS: 2,
  COMPANIES: 3
};

//jquery
//this.inputText = this.inputTextArea.val();                  
//var inputText = document.getElementById('dataInput-majors').value;
//vanilla js

//this.inputText = this.inputTextArea.val();                  //jquery
//    var inputText = document.getElementById('dataInput-positions').value;  //vanilla js
//    var outputText = "";

// function convertData(inputTextArea, outputTextArea) 
//function convertData()

/*
           Delimiter:

             <input class="settingsElement" type="radio" name="delimiter" id='delimiterAuto'   value="auto" checked/> Auto</label>
             <input class="settingsElement" type="radio" name="delimiter" id='delimiterComma'  value="comma" /> Comma</label>
             <input class="settingsElement" type="radio" name="delimiter" id='delimiterTab'    value="tab" /> Tab</label>
*/

//-----------------------------------------------------------------------------
//
// Data Converter
//
//-----------------------------------------------------------------------------

function convertData(inputTextArea, outputTextArea, propertyQuotes) {


  // Delimiter:   Auto   Comma   Tab
  //
  var columnDelimiter        = "\t";
  var rowDelimiter           = "\n";

  var delimiter              = "auto";

  
  // Decimal Sign:   Dot   Comma
  //
  var decimal               = "dot";
  
  
  // First row is the header (true/false)
  //
  var headersProvided        = true;
  

  // Transform:  downcase   upcase   none
  //
  var downcaseHeaders        = true; 
  var upcaseHeaders          = false; // can't be true if downcase = true
  

  // Include white space in output (true/false)
  //
  var includeWhiteSpace      = false; //true;
  var useTabsForIndent       = false; // can't be true if whitespace = true ??
  //  var useTabsForIndent       = false; // can't be true if whitespace = true ??


  // Indent with:  tabs  spaces
  //
  var newLine                = "\n";
  var indent                 = "  ";

  // if (includeWhiteSpace == true) {  newLine = "\n";  }
  //  else {    indent = "";  newLine = "";   }


  // --- Fed in through parameters - element ids of textarea tags
  //var inputTextArea          = {};
  //var outputTextArea         = {};

  // --- local variables now
  //var inputText              = "";
  //var outputText             = "";

  // --- Hardcoded in HTML now
  //var inputHeader            = {};
  //var outputHeader           = {};
  //var dataSelect             = {}; // removed

  // --- not used?? ....
  //var commentLine            = "//";
  //var commentLineEnd         = "";
 

  var headersProvided        = true;

  var downcaseHeaders        = true;  // ......
  var upcaseHeaders          = false; // ......

  var includeWhiteSpace      = true; //true;  // -----
  var useTabsForIndent       = false; //false; // -----

  var newLine                = "\n";
  var indent                 = "  ";


  // fed into parameter
  //var propertyQuotes         = false;
  // .............................
  //
  //var propertyQuotes         = false; // as; = true is json



  // Get the current value (raw data) in the textarea tag
  // the element was fetched by id and fed in as a parameter using vanilla js
  var inputText = inputTextArea.value;

  // make sure there is input data before converting...
  if (inputText.length > 0) {

    //
    // global??
    //
    if (includeWhiteSpace == true) {  newLine = "\n";  }
    else {  indent = "";  newLine = "";  }



    //
    //  ******* Actual data conversion happens *******
    //

    CSVParser.resetLog();
    var parseOutput = CSVParser.parse(inputText, headersProvided, delimiter, downcaseHeaders, upcaseHeaders);

    var dataGrid = parseOutput.dataGrid;
    var headerNames = parseOutput.headerNames;
    var headerTypes = parseOutput.headerTypes;
    var errors = parseOutput.errors;

    // Get the newly formatted data to put in output textarea element
    // var
    var outputText = renderData(dataGrid, headerNames, headerTypes, indent, newLine, propertyQuotes);

    outputTextArea.value = errors + outputText;

    //this.outputTextArea.val(errors + this.outputText);    //jquery
    //this.outputTextArea = document.getElementById('dataOutput');
    //this.outputTextArea.value = errors + this.outputText;

    //document.getElementById('dataOutput-majors').value = errors + outputText;
    //document.getElementById('dataOutput-positions').value = errors + outputText;

  }; //end test for existence of input text
} // end convert data





/*
function convertData(dataType) {

  switch(dataType)
  {
    case MAJORS:
      convertDataMajors();
      break;
    case POSITIONS:
      convertDataPositions();
      break;
    case BOOTHS:
      convertDataBooths();
      break;
    case COMPANIES:
      convertDataCompanies();
      break;
    default:
      break;
  }

  switch(dataType)
  {
    case "MAJORS":
      convertDataMajors();
      break;
    case "POSITIONS":
      convertDataPositions();
      break;
    case "BOOTHS":
      convertDataBooths();
      break;
    case "COMPANIES":
      convertDataCompanies();
      break;
    default:
      break;
  }*/















//-----------------------------------------------------------------------------
//
// Data Grid Renderer
//
//-----------------------------------------------------------------------------

function renderData(dataGrid, headerNames, headerTypes, indent, newLine, propQuotes) {

   //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;

    var outputText = "[";
    
    // begin render loops
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += "{";
      for (var j=0; j < numColumns; j++)
      {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "null";
        }
        else {  var rowOutput = '"'+( row[j] || "" )+'"';  };

        // am or json - depending if you want properties in quotes or not
       
        if(propQuotes) // if json.selected
        {
          //---------------------------------------
          // JSON properties - quotes around property names (json)
          //---------------------------------------
          outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
        }
        else // if as.selected
        {
          //---------------------------------------
          // Actionscript - no quotes around property names (as)
          //---------------------------------------
          outputText += (headerNames[j] + ":" + rowOutput)
        }
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };

    outputText += "];";
    return outputText;
}
//-----------------------------------------------------------------------------


//---------------------------------------
// PUBLIC METHODS
//---------------------------------------

/*DataConverter.prototype.create = function() {
  var self = this;

  //$("#dataInput").keyup(function()  { self.convert(); });
  //$("#dataInput").change(function() { self.convert(); });

  //$("#dataSelector").bind('change',function(evt){ self.convert(); });
*/




//-----------------------------------------------------------------------------
//
//   ON PAGE LOAD
//
//-----------------------------------------------------------------------------
/*$(document).ready(function(){

  // hacky, temporary
  // hacky, temporary
  // hacky, temporary
  //$("#dataInput-majors").keyup(function()   { self.convert(); });
  //$("#dataInput-majors").change(function()  { self.convert(); });

  $("#dataInput-majors").keyup(function()   { convertDataMajors(); });
  $("#dataInput-majors").change(function()  { convertDataMajors(); });


  $("#dataInput-positions").keyup(function()  { convertDataPositions(); });
  $("#dataInput-positions").change(function() { convertDataPositions(); });

  $("#dataInput-booths").keyup(function()   { convertDataBooths(); });
  $("#dataInput-booths").change(function()  { convertDataBooths(); });
*/

 

  // hacky, temporary
  // http://gomakethings.com/ditching-jquery-for-vanilla-js/
  // want to get AWAY form jquery, use vanilla js
  /*
  var dataInputs = document.querySelectorAll('.dataInput');

  [].forEach.call(dataInputs, function (rawdata) {
    rawdata.addEventListener('click', function(e) {  // Do stuff
  }, false);

    rawdata.addEventListener('keyup', function(e) { self.convert(); }, false);
    rawdata.addEventListener('change', function(e) { self.convert(); }, false);
*/



   /* if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
    document.documentElement.className += 'js';
}*/


/*
// Sandwich Functions
if ( 'querySelector' in document && 'addEventListener' in window ) {

    var sandwiches = document.querySelectorAll('.sandwich');

    [].forEach.call(sandwiches, function (sandwich) {

        sandwich.addEventListener('click', function(e) {

            if ( hasClass(sandwich, 'mustard') ) {
                removeClass(sandwich, 'mustard');
            }

            else {
                addClass(sandwich, 'mustard');
            }
        }
        
    });
*/
//}


  
//}) // DOCUMENT READY




  //---------------------------------------
  // PUBLIC PROPERTIES
  //---------------------------------------

  //this.nodeId                 = nodeId;
  //this.node                   = $("#"+nodeId);

      //
    // WHITESPACE
    //
    //d.includeWhiteSpace = $('#includeWhiteSpaceCB').attr('checked');
    /*
    if (d.includeWhiteSpace)
    {
      $("input[name=indentType]").removeAttr("disabled");
      var indentType = $('input[name=indentType]:checked').val();
      if (indentType === "tabs") {  d.indent = "\t";  } 
      else if (indentType === "spaces") {  d.indent = "  "  }
    } 
    else {  $("input[name=indentType]").attr("disabled", "disabled");  }
    */

  /*    
    //
    // HEADERS
    //
    d.headersProvided = $('#headersProvidedCB').attr('checked');

    if (d.headersProvided) {
      $("input[name=headerModifications]").removeAttr("disabled");

      var hm = $('input[name=headerModifications]:checked').val();
*/

  /*
  if (hm === "downcase")
        d.downcaseHeaders = true; d.upcaseHeaders = false;

      else if (hm === "upcase")
        d.downcaseHeaders = false; d.upcaseHeaders = true;

      else if (hm === "none")
        d.downcaseHeaders = false; d.upcaseHeaders = false;

    else {  $("input[name=headerModifications]").attr("disabled", "disabled");  }
  */
  
    //d.delimiter = $('input[name=delimiter]:checked').val();
  //d.decimal = $('input[name=decimal]:checked').val();
  

/*
SETTINGS

Delimiter:   Auto   Comma   Tab
Decimal Sign:   Dot   Comma
 First row is the header
Transform:  downcase   upcase   none
 Include white space in output
Indent with:  tabs  spaces
*/




//-----------------------------------------------------------------------------



/*
//-----------------------------------------------------------------------------
  // ----- ----- ----- SETTINGS ----- ----- -----
  // ----- SETTINGS -----
*/

  // Delimiter:   Auto   Comma   Tab
  //


  // .............................
  //
 // var propertyQuotes = true;


//-----------------------------------------------------------------------------



/*
function convertDataMajors() {

  //"dataInput-"
  //"dataOutput-"
  //"majors" "positions" "booths"

  // textarea input element and output element ids
  var inputTextArea          = document.getElementById('dataInput-majors');
  var outputTextArea         = document.getElementById('dataOutput-majors');
  convertData(inputTextArea, outputTextArea);
  
} // end convert majors



function convertDataPositions() {

  // textarea input element and output element ids
  var inputTextArea          = document.getElementById('dataInput-positions');
  var outputTextArea         = document.getElementById('dataOutput-positions');
  convertData(inputTextArea, outputTextArea);

} // end convert positions



function convertDataBooths() {

  // textarea input element and output element ids
  var inputTextArea          = document.getElementById('dataInput-booths');
  var outputTextArea         = document.getElementById('dataOutput-booths');
  convertData(inputTextArea, outputTextArea);

} // end convert booths
*/

//-----------------------------------------------------------------------------
