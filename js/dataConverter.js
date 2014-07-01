// http://stravid.com/en/cleaner-javascript-code-with-enums/

var dataTypes = {
  MAJORS: 0,
  POSITIONS: 1,
  BOOTHS: 2,
  COMPANIES: 3
};



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
//
// Data Conversion Settings
//
//-----------------------------------------------------------------------------

  var propertyQuotes         = false; // as; = true is json
  var delimiter              = "auto";

  var columnDelimiter        = "\t";
  var rowDelimiter           = "\n";

  //var inputHeader            = {};
  //var outputHeader           = {};
  //var dataSelect             = {};

  //var inputTextArea          = {};
  //var outputTextArea         = {};

  //var inputText              = "";
  //var outputText             = "";

  //var commentLine            = "//";
  //var commentLineEnd         = "";
 
  var headersProvided        = true;
  
  var downcaseHeaders        = true; 
  var upcaseHeaders          = false;

  var includeWhiteSpace      = true;
  var useTabsForIndent       = false;

  var newLine                = "\n";
  var indent                 = "  ";

  // if (includeWhiteSpace == true) {  newLine = "\n";  }
  //  else {    indent = "";  newLine = "";   }

  

  

//jquery
//this.inputText = this.inputTextArea.val();                  
//var inputText = document.getElementById('dataInput-majors').value;
//vanilla js



























//-----------------------------------------------------------------------------
//
// Data Converter
//
//-----------------------------------------------------------------------------


//this.inputText = this.inputTextArea.val();                  //jquery
//    var inputText = document.getElementById('dataInput-positions').value;  //vanilla js
//    var outputText = "";



function convertDataPositions() {

  var columnDelimiter        = "\t";
  var rowDelimiter           = "\n";

  //var inputTextArea          = {};
  //var outputTextArea         = {};

  //var inputHeader            = {};
  //var outputHeader           = {};
  //var dataSelect             = {};

  //var commentLine            = "//";
  //var commentLineEnd         = "";
 
  var headersProvided        = true;

  var downcaseHeaders        = true;  // ......
  var upcaseHeaders          = false; // ......

  var includeWhiteSpace      = true;  // -----
  var useTabsForIndent       = false; // -----

  var newLine                = "\n";
  var indent                 = "  ";

  var propertyQuotes         = false;
  var delimiter              = "auto";


  // textarea input element id
  var inputTextArea          = document.getElementById('dataInput-positions');
  var outputTextArea         = document.getElementById('dataOutput-positions');

    var inputText = inputTextArea.value;
    //var outputText = "";

  // make sure there is input data before converting...
  if (inputText.length > 0) {

    if (includeWhiteSpace == true) {  newLine = "\n";  }
    else {  
      indent = "";
      newLine = "";  
    }


    CSVParser.resetLog();
    var parseOutput = CSVParser.parse(inputText, headersProvided, delimiter, downcaseHeaders, upcaseHeaders);

    var dataGrid = parseOutput.dataGrid;
    var headerNames = parseOutput.headerNames;
    var headerTypes = parseOutput.headerTypes;
    var errors = parseOutput.errors;

    var outputText = renderData(dataGrid, headerNames, headerTypes, indent, newLine, propertyQuotes);

    //document.getElementById('dataOutput-positions').value = errors + outputText;
    outputTextArea.value = errors + outputText;


  }; //end test for existence of input text
} // end convert positions


















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