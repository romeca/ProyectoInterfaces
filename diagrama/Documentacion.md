#Instituto Tecnológico de Costa Rica

##Escuela de Ingeniería en Computación

##-Introducción al Diseño de Interfaces Gráficas de Usuario-

##Proyecto: Editor de Diagramas UML

##Profesor:
>###Armando Arce Orozco

##Estudiantes:
>###Romero Castillo Tatiana 201030428
>###Sánchez Meléndez Cristian 201042282



##Introducción
En el desarrollo de software un aspecto importante es la rápida producción de un producto, es decir, que el código sea eficiente y proporcione un grado de desempeño deseado. En la realización de este proyecto programado se tomó en cuenta este tipo de modalidad, además de hacer uso de de los tutoriales y material proporcionados por el profesor del curso. 

El Lenguaje Unificado de Modelado(UML) es el lenguaje de modelado de sistemas software más conocido y utilizado en la actualidad siendo respaldado por el Object Management Group. Es un lenguaje gráfico para visualizar, especificar, construir y documentar un sistema. UML ofrece un estándar para describir un plano del sistema (un modelo), incluyendo aspectos conceptuales tales como procesos de negocio, funciones del sistema, y aspectos concretos como expresiones de lenguajes de programación, esquemas de bases de datos y compuestos reciclados.

El primer entregable del Editor de Diagramas UML se utilizó la libreria JointJS
la cual es una biblioteca de JavaScript para la creación de diagramas. Los diagramas pueden ser totalmente interactivo.Las características principales incluyen:

> * Conectar objetos de vectores con diferentes tipos de flechas
> * Interactuar con conexiones y los objetos
> * Controladores personalizados para diversos eventos
> * Líneas dobladas suavizado
> * Listos para utilizar elementos de conocidos diagramas
> * Diagramas jerárquicos
> * Serialización
> * Extensible
> * Personalizable y mucho más




##Descripción del contenido a desplegar

El proyecto debe desplegar una interfaz que permita al usuario cargar un archivo .xml el cual contiene: 

En el presente editor de diagramas se muestran básicamente dos objetos:
> 1. La clase
> 2. Las conexiones entre las clases (No se pudo desarrollar por problemas con la libreria trabajando bajo xul)
> 3. Los métodos y atributos que contiene la clase

Luego de realizar la lectura del archivo, se debe mostrar los datos en una aplicación web realizaba bajo el ambiente XUL. En importante recalcar que 
dentro de la clase se tienen tres elementos, de los cuales dos pueden no estar presentes, el que es esencial es el nombre de 
la clase para identificarlas entre ellas, otra parte sería los atributos propios que son desplegados en un segundo apartado 
de la clase UML, y el tercer elemento serían los métodos propios a cada clase que se muestran dentro de la clase en un apartado 
diferente. Al final cada clase se ve como una tabla de una columna y tres filas como lo es en el formato UML.


En el caso de las conexiones se pueden crear diferentes tipos de enlaces, entre las cuales se encuentran:
> 1. Herencia 
> 2. Composición 
> 3. Agregación  
> 4. Asociación y Uso. 

Por lo tanto, cada relación tiene su tipo de identificador gráfico.Sin embargo, este tipo de relaciones entre clases no fue posible implementarlo pues se tuvo problemas con la libreria JointJS.





##Definición de estructuras de datos utilizadas

El formato que se implemento para cargar los archivos fue extensión .XML, pues al ser iguales a los ejemplos realizados en clase, el equipo estaba familiarizado con los terminos y se conocía el código. Además es una manera simple de representar este tipo de información, y su mantenimiento de la aplicación se torna mas sencilla.

Este archivo contiene elementos de tipo clase, dentro de los cuales tiene los tributos correspondientes a cada apartado 
de la clase UML, y al final tiene las conexiones que se representaran en el diagrama, osea, primero estan definidas todas 
las clases y luego se conectan entre ellas utilizando el nombre de cada una para este paso.





##Forma de compilación, ejecución y utilización de la aplicación

Para la compilación, ejecución y utilización de la aplicacion web, es necesario contar con las librerias de javascript d3.js, joint.all.min.js, apenas de contar con el transcompilador de coffeescript. Luego se debe llevar a cabo los siguientes pasos:

> 1. Se debe llegar hasta el directorio "content" que se ubica en la carpeta de la apliación y compilar el archivo main.coffee, tal como se muestra en la imagen
 ![Texto alternativo](https://lh6.googleusercontent.com/-I4vVBTUTkhM/UG8gyrzoo-I/AAAAAAAABz8/maz5aW2ovro/s677/1.PNG)

> 2. Luego se debe compilador la aplicacion utilizando Mozilla Firefox, tal como se muestra a continuación:
 ![Texto alternativo](https://lh4.googleusercontent.com/-0Cheb9DR-0o/UG8g0PFsnnI/AAAAAAAAB0E/TUYVw9MQBpY/s677/2.PNG)


> 3. Al ejecutar la instruccion anterior, se debe desplegar la siguiente interfaz. En ella el usuario entra a "File" y carga el archivo que desee extension .xml.
 ![Texto alternativo](https://lh6.googleusercontent.com/-mR3hpj-srrA/UG8g15-rvaI/AAAAAAAAB0M/CPaG1v3NGgY/s640/3.PNG)

> 4. Despues de que el usuario escoge el archivo a cargar, se despliega el diagrama de clases UML.
 ![Texto alternativo](https://lh4.googleusercontent.com/-kbNsQtAOlXI/UG8g3Soj0CI/AAAAAAAAB0U/PMFRpTg9JnA/s512/4.PNG)

##Ejemplos de datos a utilizar como pruebas

Los ejemplos de archivos XML con los que se ejecutaron el editor tienen los siguientes formatos, se definen las clases y las conexiones en un solo apartado definido como "clases":

Este ejemplo es uno completo donde cada clase tiene todos los datos

clases

> clase nombre="Padre" atributos="-edad:int$-profesion:string" metodos="+trabajar()$dormir()"

> clase nombre="Hijo" atributos="-edad:int$-estado:string" metodos="+estudiar()$+jugar()"

> clase nombre="Hija" atributos="-edad:int$-bonita:bool" metodos="+estudiar()$+maquillarse()"

> conexion clase1="Cris" clase2="Padre"

> conexion clase1="Tatis" clase2="Padre"

clases

El siguiente muestra que pueden faltar datos en algun apartado de la clase, por ejemplo Camioneta no tiene atributos y la clase simplemente deja el espacio en blanco correspondiente a los atributos

clases

> clase nombre="Vehiculo" atributos="-motor:int" metodos="$avanzar()"

> clase nombre="Automovil" atributos="-edad:int$-estado:string" metodos=""

> clase nombre="Camioneta" atributos="" metodos="+detenerse()"

> conexion clase1="Camioneta" clase2="Vehiculo"

> conexion clase1="Automovil" clase2="Vehiculo"

clases>






##Limitaciones observadas y posibles mejoras 
En este proyecto se presentaron muchos inconvenientes con las librerias utilizadas, pues ninguna es compatible al 100% con XUL, se probaron en HTML para verificar algun problema de la misma pero solo daba problemas de funcionamiento en XUL, se investigaron muchas pero la que era un poco mas compatible fue Joint.js desde la cual logramos diagramar las clases leidas desde el archivo, cargandoles sus diferentes partes, pero no se logran conectar, el avance mas significativo fue que dibujara la primer conexion entre dos clases, pero dañaba las clases conectadas porque si se intentaban arrastrar por la pantalla se perdian de vista y la flecha que definía dicha conexión se posicionaba en otros puntos, esta fue la razon por la cual se dejaron de usar.

En base a los problemas mencionados anteriormente se espera que con nuevas librerias se permita hacer las conexiones entre las clases existentes en el campo de trabajo, y la edicion de la información que tiene cada clase (atributos, metodos o el nombre). Se puede mejorar un poco el código de la generación del diagrama para permitir más aprovechamiento de código y mejorar el rendimiento de la aplicación.




