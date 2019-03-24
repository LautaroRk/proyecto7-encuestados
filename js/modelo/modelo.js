/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var ids = this.preguntas.map((pregunta) => pregunta.id);
    var ultimoId = ids.length ? Math.max(...ids) : -1;
    return ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(idPregunta) {
    var preguntaAEliminar = this.preguntas.find((pregunta) => pregunta.id === idPregunta);
    var index = this.preguntas.indexOf(preguntaAEliminar);
    this.preguntas.splice(index, 1);
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function() {
    this.preguntas = [];
    this.preguntaEliminada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },
};