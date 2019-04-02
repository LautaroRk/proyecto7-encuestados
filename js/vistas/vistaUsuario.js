/*
 * Vista usuario
 */
var VistaUsuario = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  //suscripcion a eventos del modelo
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
    contexto.reconstruirGrafico();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
    contexto.reconstruirGrafico();
  });

  this.modelo.respuestaVotada.suscribir(function(){
    contexto.reconstruirGrafico();
  });
};

VistaUsuario.prototype = {
  //muestra la lista por pantalla y agrega el manejo del boton agregar
  inicializar: function() {
    this.reconstruirLista();      
    this.reconstruirGrafico();
    this.configuracionDeBotones();
  },

  //reconstruccion de los graficos de torta
  reconstruirGrafico: function(){
    var contexto = this;
    //obtiene las preguntas del local storage
    var preguntas = this.modelo.preguntas;
    
    preguntas.forEach(function(clave){
      let seVotoAlgunaVez = false;
      var listaParaGrafico = [[clave.textoPregunta, 'Cantidad']];
      var respuestas = clave.cantidadPorRespuesta;
      respuestas.forEach (function(elemento) {
        listaParaGrafico.push([elemento.textoRespuesta,elemento.cantidad]);
        if (elemento.cantidad) seVotoAlgunaVez = true;
      });
      if (seVotoAlgunaVez) contexto.dibujarGrafico(clave.textoPregunta, listaParaGrafico);
    })
  },


  reconstruirLista: function() {
    var listaPreguntas = this.elementos.listaPreguntas;
    listaPreguntas.html('');
    var contexto = this;
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function(clave){
      //completar
      //agregar a listaPreguntas un elemento div con valor "clave.textoPregunta", texto "clave.textoPregunta", id "clave.id"
      listaPreguntas.append($('<div>').text(clave.textoPregunta).val(clave.textoPregunta).attr('id', clave.id));
      var respuestas = clave.cantidadPorRespuesta;
      contexto.mostrarRespuestas(listaPreguntas, respuestas, clave);
    });
  },

  //muestra respuestas
  mostrarRespuestas:function(listaPreguntas,respuestas, clave){
    respuestas.forEach (function(elemento) {
      listaPreguntas.append($('<input>', {
        type: 'radio',
        value: elemento.textoRespuesta,
        name: clave.id,
      }));
      listaPreguntas.append($("<label>", {
        for: elemento.textoRespuesta,
        text: elemento.textoRespuesta
      }));
    });
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
        // var nombrePregunta = $(this).attr('value');
        var idPregunta = parseInt($(this).attr('id'));
        var respuestaSeleccionada = $('input[name=' + idPregunta + ']:checked').val();
        $('input[name=' + idPregunta + ']').prop('checked',false);
        if(respuestaSeleccionada) {
          contexto.controlador.agregarVoto(idPregunta,respuestaSeleccionada);
        }
    });
  },

  dibujarGrafico: function(nombre, respuestas){
    var seVotoAlgunaVez = false;
    for(var i=1;i<respuestas.length;++i){
      if(respuestas[i][1]>0){
        seVotoAlgunaVez = true;
      }
    }
    var contexto = this;
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(respuestas);

      var options = {
        title: nombre,
        is3D: true,
      };
      var ubicacionGraficos = contexto.elementos.graficosDeTorta;
      var id = (nombre.replace(/\W/g, '')).split(' ').join('')+'_grafico';
      if($('#'+id).length){$('#'+id).remove()}
      var div = document.createElement('div');
      ubicacionGraficos.append(div);
      div.id = id;
      div.style.width = '400';
      div.style.height = '300px';
      var chart = new google.visualization.PieChart(div);
      if(seVotoAlgunaVez){
        chart.draw(data, options);
      };
    }
  },

  configuracionDeBotones: function(){
    let e = this.elementos;
    let contexto = this;

    e.botonAgregar.click(function() {
      contexto.agregarVotos();
    });
  }
};
