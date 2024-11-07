// exceptions/usuarioExistenteException.js
class UsuarioExistenteException extends Error {
    constructor(message) {
      super(message);
      this.name = 'UsuarioExistenteException';
    }
  }
  
  module.exports = UsuarioExistenteException;
  