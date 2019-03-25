/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(idPregunta) {
    this.modelo.borrarPregunta(idPregunta);
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  // agregarVoto: function()
};
