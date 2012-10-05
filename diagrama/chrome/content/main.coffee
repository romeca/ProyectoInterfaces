class File

  open: ->
    nsIFilePicker = Components.interfaces.nsIFilePicker
    fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker)
    fp.init(window, "Open File", nsIFilePicker.modeOpen)
    fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll)
    res = fp.show()
    if (res == nsIFilePicker.returnOK)
      thefile = fp.file
      data = @read(thefile.path)
      @makeDiagram(data)

  read: (filename) ->
    nsILocalFile = Components.interfaces.nsILocalFile
    file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile)
    file.initWithPath(filename)
    if (file.exists() == false)
      alert("File does not exist")
    nsIFileInputStream = Components.interfaces.nsIFileInputStream
    inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(nsIFileInputStream)
    inputStream.init(file,0x01,00004,null)
    nsIScriptableInputStream = Components.interfaces.nsIScriptableInputStream
    sInputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(nsIScriptableInputStream)
    sInputStream.init(inputStream)
    output = sInputStream.read(sInputStream.available())
    return output

  save: ->
    nsIFilePicker = Components.interfaces.nsIFilePicker
    fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker)
    fp.init(window, "Save File", nsIFilePicker.modeSave)
    fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll)
    res = fp.show()
    if (res == nsIFilePicker.returnOK)
      thefile = fp.file
      @write(thefile.path,@xml2string(@doc))

  write: (filename,data) ->
    nsILocalFile = Components.interfaces.nsILocalFile
    file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile)
    nsIFileOutputStream = Components.interfaces.nsIFileOutputStream
    outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(nsIFileOutputStream)
    file.initWithPath(filename)
    outputStream.init(file, 0x04 | 0x08 | 0x20, 0666, 0)
    outputStream.write(data,data.length)
    outputStream.close()

  makeConnection: (array, all) ->
    @uml = Joint.dia.uml
    for j in [0..array.length-1]
      @claseActual = array[j].attributes.item(0).nodeValue
      @claseEnlazada = array[j].attributes.item(1).nodeValue
      alert("Conexion desde "+@claseActual+" a "+@claseEnlazada)
      @claseActual.joint(@claseEnlazada, @uml.generalizationArrow).register(all) 
  
  makeClasses: (array) ->
    @uml = Joint.dia.uml
    Joint.paper("world", 900, 700)
    @posY = 20
    @posX = 20
    for j in [0..array.length-1]
      @nombre = array[j].attributes.item(0).nodeValue
      @atributos = array[j].attributes.item(1).nodeValue
      @metodos = array[j].attributes.item(2).nodeValue
      @uml.Class.create({
        rect: {x: @posX, y: @posY, width: 100, height: 200},
        shadow: true,
        swimlane1OffsetY: 30,
        attrs: {fill:  "90-#000-#f10:1-#fff"},
        labelAttrs: {'font-weight': 'bold'},
        label: @nombre,
        methods: @metodos.split("$"),
        attributes: @atributos.split("$")})
      @posY += 50
      @posX += 110
      

  makeDiagram: (data) ->
    parser = new DOMParser()
    @doc = parser.parseFromString(data,"application/xml")
    array = d3.select(@doc).selectAll("clase")[0]
    @makeClasses(array)
    @all = []
    for j in [0..array.length-1]
      @all.push(array[j].attributes.item(0).nodeValue)
    array = d3.select(@doc).selectAll("conexion")[0]
    @makeConnection(array, @all)

@file = new File