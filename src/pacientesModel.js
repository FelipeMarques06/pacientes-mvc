export default class PacientesModel {
  pacientes = [];
  currentId = 1;

  add(data) {
    this.pacientes.push({
      ...data,
      id: this.currentId,
    });

    this.currentId++;
  }

  edit(id, data) {
    const pacienteIndex = this.pacientes.findIndex((p) => p.id === id);

    if (pacienteIndex > -1) {
      this.pacientes[pacienteIndex] = { ...data, id };
    }
  }

  delete(id) {
    this.pacientes = this.pacientes.filter((p) => p.id !== id);
  }
}
