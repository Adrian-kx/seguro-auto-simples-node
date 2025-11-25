class Observer {
  update(_data) {
    throw new Error("Método update precisa ser implementado");
  }
}

module.exports = Observer;
