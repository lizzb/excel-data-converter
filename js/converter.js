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

}

//---------------------------------------
// PUBLIC METHODS
//---------------------------------------

DataConverter.prototype.create = function(w,h) {
  var self = this;

  $("#dataInput").keyup(function() {self.convert()});
  $("#dataInput").change(function() {
    self.convert();
    _gaq.push(['_trackEvent', 'DataType',self.outputDataType]);
  });

  $("#dataSelector").bind('change',function(evt){
       self.outputDataType = $(this).val();
       self.convert();
     });

  // this.resize(w,h);
}


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

    this.outputText = DataGridRenderer[this.outputDataType](dataGrid, headerNames, headerTypes, this.indent, this.newLine);


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

function insertSampleData() {

  document.getElementById('dataInput').value = "NAME\tVALUE\tCOLOR\tDATE\nAlan\t12\tblue\tSep. 25, 2009\nShan\t13\t\"green\tblue\"\tSep. 27, 2009\nJohn\t45\torange\tSep. 29, 2009\nMinna\t27\tteal\tSep. 30, 2009";
  document.getElementById('converter').convert();
}



