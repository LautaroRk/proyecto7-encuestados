// TO DO:
  // cambiar sistema de ids del formulario respuesta

//PREGUNTAS: 
  // var pregunta = this.buscarPreguntaPorId(id);
  // pregunta.textoPregunta = textoPregunta;
  // - Se modifica la pregunta original?

  // - Cuando borro una respuesta que no es la ultima, los ids de los inputs respuesta pierden el hilo



/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = localStorage.preguntas ? JSON.parse(localStorage.getItem('preguntas')) : [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.respuestaVotada = new Evento(this);
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
    var index = this.buscarIndiceAPartirDeId(idPregunta);
    this.preguntas.splice(index, 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function(idPregunta, nuevoTextoPregunta, respuestas) {
    var index = this.buscarIndiceAPartirDeId(idPregunta);
    this.preguntas[index].textoPregunta = nuevoTextoPregunta;
    this.preguntas[index].cantidadPorRespuesta = respuestas;
    this.guardar();
    this.preguntaEditada.notificar();
  },

  buscarIndiceAPartirDeId: function(idPregunta) {
    var pregunta = this.buscarPreguntaPorId(idPregunta);
    return this.preguntas.indexOf(pregunta);
  },

  buscarPreguntaPorId: function(idPregunta) {
    return this.preguntas.find((pregunta) => pregunta.id === idPregunta);
  },

  votarRespuesta: function(idPregunta, textoRespuesta) {
    var pregunta = this.buscarPreguntaPorId(idPregunta);
    var respuesta = pregunta.cantidadPorRespuesta.find((respuesta) => respuesta.textoRespuesta === textoRespuesta);
    respuesta.cantidad++;
    this.guardar();
    this.respuestaVotada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
