// previous order: jquery, csvparser, renderer, converter, controller


//-----------------------------------------------------------------------------
// Data Grid Renderer
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

function renderData(dataGrid, headerNames, headerTypes, indent, newLine, propQuotes) {

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

        // if json.selected
        if(propQuotes)
        {
          outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
        }
        else
        {
          outputText += (headerNames[j] + ":" + rowOutput)
        }
        // outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
        // if as.selected
        // outputText += (headerNames[j] + ":" + rowOutput)

        //outputText += (headerNames[j] + ":" + rowOutput)


        if (j < (numColumns-1)) {outputText+=","};
      };
      outputText += "}";

      if (i < (numRows-1)) {outputText += ","+newLine};

    };

    outputText += "];";
    
    
    return outputText;

}


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

        // if json.selected
        // outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );
        // if as.selected
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
  
}

//-----------------------------------------------------------------------------
// Controller
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

//
// unclear to me why this is a function and not just handled by css....?
//
/*DataConverter.prototype.resize = function(w,h) {

  var paneWidth = w;
  var paneHeight = (h-90)/2-20;

  //this.node.css({width:paneWidth});
  //this.inputTextArea.css({width:paneWidth-20,height:paneHeight});
  //this.outputTextArea.css({width: paneWidth-20, height:paneHeight});

}*/


function DataConverter(nodeId) {

  //---------------------------------------
  // PUBLIC PROPERTIES
  //---------------------------------------

  this.nodeId                 = nodeId;
  this.node                   = $("#"+nodeId);

  this.outputDataTypes        = [
                                {"text":"Properties not in quotes (Actionscript)",       "id":"as",               "notes":""},
                                {"text":"Properties in quotes (JSON - Properties)",      "id":"json",             "notes":""},
                                ];
  this.outputDataType         = "json";

  this.columnDelimiter        = "\t";
  this.rowDelimiter           = "\n";

  this.inputTextArea          = {};
  this.outputTextArea         = {};

  this.inputHeader            = {};
  this.outputHeader           = {};
  this.dataSelect             = {};

  this.inputText              = "";
  this.outputText             = "";

  this.newLine                = "\n";
  this.indent                 = "  ";

  this.commentLine            = "//";
  this.commentLineEnd         = "";
  this.tableName              = "MrDataConverter" // what is this used for? html?

  this.useUnderscores         = true; // ????
  this.headersProvided        = true;
  this.downcaseHeaders        = true; 
  //this.upcaseHeaders          = false; // why would this be used..?
  this.includeWhiteSpace      = true;
  this.useTabsForIndent       = false;


  // .............................
  this.propertyQuotes = false;
  this.propertyQuotes = true;

}

//---------------------------------------
// PUBLIC METHODS
//---------------------------------------

DataConverter.prototype.create = function() { //function(w,h) {
  var self = this;

  $("#dataInput").keyup(function() {self.convert()});
  $("#dataInput").change(function() {
    self.convert();
   // _gaq.push(['_trackEvent', 'DataType',self.outputDataType]);
  });

  $("#dataSelector").bind('change',function(evt){
       //self.outputDataType = $(this).val();
       self.convert();
     });

  // this.resize(w,h);
}


//
//  ******* Actual data conversion happens *******
//
DataConverter.prototype.convert = function() {

  //this.inputText = this.inputTextArea.val();                  //jquery
  this.inputText = document.getElementById('dataInput').value;  //javascript only
  this.outputText = "";


  // make sure there is input data before converting...
  if (this.inputText.length > 0) {

    if (this.includeWhiteSpace) {  this.newLine = "\n";  } // console.log("yes")
    else {  this.indent = ""; this.newLine = "";  } // console.log("no")


    CSVParser.resetLog();
    var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

    var dataGrid = parseOutput.dataGrid;
    var headerNames = parseOutput.headerNames;
    var headerTypes = parseOutput.headerTypes;
    var errors = parseOutput.errors;

    //this.outputText = DataGridRenderer[this.outputDataType](dataGrid, headerNames, headerTypes, this.indent, this.newLine);


    this.outputText = renderData(dataGrid, headerNames, headerTypes, this.indent, this.newLine, this.propertyQuotes);

    //this.outputTextArea.val(errors + this.outputText);    //jquery
    this.outputTextArea = document.getElementById('dataOutput');
    this.outputTextArea.value = errors + this.outputText;

  }; //end test for existence of input text
}

/*
DataConverter.prototype.insertSampleData = function() {
  // $("#insertSample").bind('click',function(evt){
  //evt.preventDefault();
  //this.inputTextArea.val("NAME\tVALUE\tCOLOR\tDATE\nAlan\t12\tblue\tSep. 25, 2009\nShan\t13\t\"green\tblue\"\tSep. 27, 2009\nJohn\t45\torange\tSep. 29, 2009\nMinna\t27\tteal\tSep. 30, 2009");
  
  document.getElementById('dataInput').value = "NAME\tVALUE\tCOLOR\tDATE\nAlan\t12\tblue\tSep. 25, 2009\nShan\t13\t\"green\tblue\"\tSep. 27, 2009\nJohn\t45\torange\tSep. 29, 2009\nMinna\t27\tteal\tSep. 30, 2009";
  self.convert();
}*/




//-----------------------------------------------------------------------------
// Controller
//-----------------------------------------------------------------------------



//-----------------------------------------------------------------------------

//var _gaq = _gaq || [];

$(document).ready(function(){

  var sidebar = $('#header');

  var widthOffset = 345;
  var heightOffset = 35

  var win = $(window);
  var w = win.width() - widthOffset;
  var h = win.height() - heightOffset;

  var d = new DataConverter('converter');
  d.create(); //(w,h);
  //d.convert(); // want this to go instantly... grr.......TODO

  $(".settingsElement").change(updateSettings);

  /*
  $(window).bind('resize',function() {  

      w = win.width() - widthOffset;
      h = win.height() - heightOffset;
      d.resize(w,h);
      sidebar.height(h);

    });
*/


  function updateSettings (evt) {
    
    if (evt) {
    //  _gaq.push(['_trackEvent', 'Settings',evt.currentTarget.id ]);
    };

    //
    // WHITESPACE
    //
    /*d.includeWhiteSpace = $('#includeWhiteSpaceCB').attr('checked');
    
    if (d.includeWhiteSpace)
    {
      $("input[name=indentType]").removeAttr("disabled");
      var indentType = $('input[name=indentType]:checked').val();
      if (indentType === "tabs") {  d.indent = "\t";  } 
      else if (indentType === "spaces") {  d.indent = "  "  }
    } 
    else {  $("input[name=indentType]").attr("disabled", "disabled");  }
    */
    //
    // HEADERS
    //
    /*d.headersProvided = $('#headersProvidedCB').attr('checked');

    if (d.headersProvided) {
      $("input[name=headerModifications]").removeAttr("disabled");

      var hm = $('input[name=headerModifications]:checked').val();
      if (hm === "downcase") {
        d.downcaseHeaders = true; d.upcaseHeaders = false;
      }
      else if (hm === "upcase") {
        d.downcaseHeaders = false; d.upcaseHeaders = true;
      }
      else if (hm === "none") {
        d.downcaseHeaders = false; d.upcaseHeaders = false;
      }
    }
    else {  $("input[name=headerModifications]").attr("disabled", "disabled");  }
    */

    //d.delimiter = $('input[name=delimiter]:checked').val();
    //d.decimal = $('input[name=decimal]:checked').val();
    
    //d.useUnderscores = true;

    //d.propertyQuotes = true;
    
    d.convert();
  
  };

  updateSettings();





  
}) // DOCUMENT READY




