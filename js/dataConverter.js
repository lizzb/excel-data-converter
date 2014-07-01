//-----------------------------------------------------------------------------
//
// Data Conversion Settings
//
//-----------------------------------------------------------------------------






























//-----------------------------------------------------------------------------
//
// Data Converter
//
//-----------------------------------------------------------------------------


function convertDataPositions() {


  var columnDelimiter        = "\t";
  var rowDelimiter           = "\n";

  var inputTextArea          = {};
  var outputTextArea         = {};

  var inputHeader            = {};
  var outputHeader           = {};
  var dataSelect             = {};

  var newLine                = "\n";
  var indent                 = "  ";

  var commentLine            = "//";
  var commentLineEnd         = "";
 
  var headersProvided        = true;
  var downcaseHeaders        = true; 
  var upcaseHeaders          = false; // why would this be used..?
  var includeWhiteSpace      = true;
  var useTabsForIndent       = false;



  var propertyQuotes = false;
  var delimiter = "auto";

    //this.inputText = this.inputTextArea.val();                  //jquery
    var inputText = document.getElementById('dataInput-positions').value;  //vanilla js
    var outputText = "";

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

    //this.outputText = DataGridRenderer[this.outputDataType](dataGrid, headerNames, headerTypes, this.indent, this.newLine);


    //this.outputText = renderData(dataGrid, headerNames, headerTypes, this.indent, this.newLine, this.propertyQuotes);

    //var 
    outputText = renderData(dataGrid, headerNames, headerTypes, indent, newLine,propertyQuotes);

    document.getElementById('dataOutput-positions').value = errors + outputText;


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