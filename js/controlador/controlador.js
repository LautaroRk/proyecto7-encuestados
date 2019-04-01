/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(textoPregunta, respuestas) {
    if(esString(textoPregunta) && validarRespuestas(respuestas)) {
      this.modelo.agregarPregunta(textoPregunta, respuestas);
    }
    if(!esString(textoPregunta)) {
      alert('La pregunta no puede estar vacía.');
    }
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
    if(idValido(idPregunta) && esString(nuevoTextoPregunta) && validarRespuestas(respuestas)) {
      this.modelo.editarPregunta(idPregunta, nuevoTextoPregunta, respuestas);
    };
  },
  agregarVoto: function(idPregunta, textoRespuesta) {
    // if(idValido(idPregunta) && esString(textoRespuesta)) {
      this.modelo.votarRespuesta(idPregunta, textoRespuesta);
    // };
  },
};


// Validaciones 
function idValido(id) {
  return Number.isInteger(id) && id >= 0;
};

function esString(string) {
  return typeof string === 'string' && string.length > 0;
};

function validarRespuestas(respuestas) {
  let esArray = Array.isArray(respuestas);
  let cantidadSuficiente = respuestas.length >= 2;
  let respuestasNoVacias = respuestas.every(respuesta => this.esString(respuesta.textoRespuesta));

  if(!cantidadSuficiente) {
    alert('Cada pregunta debe tener al menos dos respuestas.');
  }
  else if(!respuestasNoVacias) {
    alert('La respuesta no puede estar vacía.');
  }

  return esArray && cantidadSuficiente && respuestasNoVacias;
}
