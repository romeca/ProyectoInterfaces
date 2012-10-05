(function() {
  var File;
  File = (function() {
    function File() {}
    File.prototype.open = function() {
      var data, fp, nsIFilePicker, res, thefile;
      nsIFilePicker = Components.interfaces.nsIFilePicker;
      fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      fp.init(window, "Open File", nsIFilePicker.modeOpen);
      fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll);
      res = fp.show();
      if (res === nsIFilePicker.returnOK) {
        thefile = fp.file;
        data = this.read(thefile.path);
        return this.makeDiagram(data);
      }
    };
    File.prototype.read = function(filename) {
      var file, inputStream, nsIFileInputStream, nsILocalFile, nsIScriptableInputStream, output, sInputStream;
      nsILocalFile = Components.interfaces.nsILocalFile;
      file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile);
      file.initWithPath(filename);
      if (file.exists() === false) {
        alert("File does not exist");
      }
      nsIFileInputStream = Components.interfaces.nsIFileInputStream;
      inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(nsIFileInputStream);
      inputStream.init(file, 0x01, 00004, null);
      nsIScriptableInputStream = Components.interfaces.nsIScriptableInputStream;
      sInputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(nsIScriptableInputStream);
      sInputStream.init(inputStream);
      output = sInputStream.read(sInputStream.available());
      return output;
    };
    File.prototype.save = function() {
      var fp, nsIFilePicker, res, thefile;
      nsIFilePicker = Components.interfaces.nsIFilePicker;
      fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      fp.init(window, "Save File", nsIFilePicker.modeSave);
      fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll);
      res = fp.show();
      if (res === nsIFilePicker.returnOK) {
        thefile = fp.file;
        return this.write(thefile.path, this.xml2string(this.doc));
      }
    };
    File.prototype.write = function(filename, data) {
      var file, nsIFileOutputStream, nsILocalFile, outputStream;
      nsILocalFile = Components.interfaces.nsILocalFile;
      file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile);
      nsIFileOutputStream = Components.interfaces.nsIFileOutputStream;
      outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(nsIFileOutputStream);
      file.initWithPath(filename);
      outputStream.init(file, 0x04 | 0x08 | 0x20, 0666, 0);
      outputStream.write(data, data.length);
      return outputStream.close();
    };
    File.prototype.makeConnection = function(array, all) {
      var j, _ref, _results;
      this.uml = Joint.dia.uml;
      _results = [];
      for (j = 0, _ref = array.length - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        this.claseActual = array[j].attributes.item(0).nodeValue;
        this.claseEnlazada = array[j].attributes.item(1).nodeValue;
        alert("Conexion desde " + this.claseActual + " a " + this.claseEnlazada);
        _results.push(this.claseActual.joint(this.claseEnlazada, this.uml.generalizationArrow).register(all));
      }
      return _results;
    };
    File.prototype.makeClasses = function(array) {
      var j, _ref, _results;
      this.uml = Joint.dia.uml;
      Joint.paper("world", 900, 700);
      this.posY = 20;
      this.posX = 20;
      _results = [];
      for (j = 0, _ref = array.length - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        this.nombre = array[j].attributes.item(0).nodeValue;
        this.atributos = array[j].attributes.item(1).nodeValue;
        this.metodos = array[j].attributes.item(2).nodeValue;
        this.uml.Class.create({
          rect: {
            x: this.posX,
            y: this.posY,
            width: 100,
            height: 200
          },
          shadow: true,
          swimlane1OffsetY: 30,
          attrs: {
            fill: "90-#000-#f10:1-#fff"
          },
          labelAttrs: {
            'font-weight': 'bold'
          },
          label: this.nombre,
          methods: this.metodos.split("$"),
          attributes: this.atributos.split("$")
        });
        this.posY += 50;
        _results.push(this.posX += 110);
      }
      return _results;
    };
    File.prototype.makeDiagram = function(data) {
      var array, j, parser, _ref;
      parser = new DOMParser();
      this.doc = parser.parseFromString(data, "application/xml");
      array = d3.select(this.doc).selectAll("clase")[0];
      this.makeClasses(array);
      this.all = [];
      for (j = 0, _ref = array.length - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
        this.all.push(array[j].attributes.item(0).nodeValue);
      }
      array = d3.select(this.doc).selectAll("conexion")[0];
      return this.makeConnection(array, this.all);
    };
    return File;
  })();
  this.file = new File;
}).call(this);
