export default class PacientesModel {
  pacientes = JSON.parse(localStorage.getItem("db_paciente")) ?? [];
  currentId = 0;

  add(data) {
    this.pacientes.push({
      ...data,
      id: this.currentId,
    });
    this.currentId++;
    localStorage.setItem("db_paciente", JSON.stringify(this.pacientes));
    
  }

  edit(id, data) {
    const pacienteIndex = this.pacientes.findIndex((p) => p.id === id);

    if (pacienteIndex > -1) {
      this.pacientes[pacienteIndex] = { ...data, id };
      localStorage.setItem("db_paciente", JSON.stringify(this.pacientes));
    }
  }

  delete(id) {
    this.pacientes = this.pacientes.filter((p) => p.id !== id);
    localStorage.setItem("db_paciente", JSON.stringify(this.pacientes));
  }
}
