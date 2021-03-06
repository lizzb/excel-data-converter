
var DataGridRenderer = {

  // am or json - depending if you want properties in quotes or not
  
  //---------------------------------------
  // JSON properties - quotes around property names
  //---------------------------------------


  //---------------------------------------
  // Actionscript - no quotes around property names
  //---------------------------------------
  
  as: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;


    var outputText = "[";
    
    //begin render loops
    for (var i=0; i < numRows; i++) {

      var row = dataGrid[i];

      outputText += "{";
      for (var j=0; j < numColumns; j++)
      {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float"))
        {
          var rowOutput = row[j] || "null";
        }
        else {  var rowOutput = '"'+( row[j] || "" )+'"';  };

        // ONLY difference i can tell
        // json properties format = json
        // the header names are in quotes for json, not for actionscript
        // outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
        // outputText += (headerNames[j] + ":" + rowOutput)

        outputText += (headerNames[j] + ":" + rowOutput)
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";

      if (i < (numRows-1)) {outputText += ","+newLine};

    };

    outputText += "];";
    
    
    return outputText;
  },
  
  
  

  
  json: function (dataGrid, headerNames, headerTypes, indent, newLine) {
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "[";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;
    
    //begin render loop
    for (var i=0; i < numRows; i++) {
      var row = dataGrid[i];
      outputText += "{";
      for (var j=0; j < numColumns; j++) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          var rowOutput = row[j] || "null";
        } else {
          var rowOutput = '"' + ( row[j] || "" ) + '"';
        };
  
      outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
  
        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";
      if (i < (numRows-1)) {outputText += ","+newLine};
    };
    outputText += "]";
    
    return outputText;
  },
  
  
}