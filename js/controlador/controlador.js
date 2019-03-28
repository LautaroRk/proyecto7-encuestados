/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(textoPregunta, respuestas) {
    this.modelo.agregarPregunta(textoPregunta, respuestas);
  },
  borrarPregunta: function(idPregunta) {
    if(idValido(idPregunta)) {
      this.modelo.borrarPregunta(idPregunta);
    };
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  editarPregunta: function(idPregunta, nuevoTextoPregunta, respuestas) {
    if(idValido(idPregunta)) {
      this.modelo.editarPregunta(idPregunta, nuevoTextoPregunta, respuestas);
    };
  },
  votarRespuesta: function(idPregunta, textoRespuesta) {
    if(idValido(idPregunta)) {
      this.modelo.votarRespuesta(idPregunta, textoRespuesta);
    };
  },
};


// Validaciones 
function idValido(id) {
  return typeof id === 'number' && id >= 0;
};
