export default class PacientesController {
  editModal = new bootstrap.Modal(document.getElementById("edit-modal"));

  editToast = new bootstrap.Toast(document.getElementById("edit_toast"));

  delToast = new bootstrap.Toast(document.getElementById("del_toast"));

  constructor(seletor, model) {
    this.seletor = seletor;
    this.model = model;

    this.setupForm();
    this.setupAdd();
      
  }

  setupForm() {
    $("#telefone, #telefone_edit").mask("(00) 00000-0000");
    $("#cpf, #cpf_edit").mask("000.000.000-00");
    $("#rg, #rg_edit").mask("00.000.000-0");
    $("#cep, #cep_edit").mask("00000-000")

    $("#edit_paciente").submit((e) => {

      //Validando os campos do Edit
      let form = $("#edit_paciente");
      if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } 
      form.addClass('was-validated');
      if(form[0].checkValidity() === true){
        e.preventDefault();
        //Editando
        const inputs = $("#edit_paciente").serializeArray();
        const id = Number(inputs[0].value);
        const data = {
          nome: inputs[1].value,
          email: inputs[2].value,
          telefone: inputs[3].value,
          cpf: inputs[4].value,
          rg: inputs[5].value,
          cep: inputs[6].value,
        };

        this.model.edit(id, data);
        this.build();
        this.editModal.hide();
        this.editToast.show({ autohide: true });

        $("#edit_paciente input").val("");
      }   
    });
  }

  setupAdd() {

    $("#add_paciente").submit((e) => {
      
      //Validando os campos do Adicionar
      let form = $("#add_paciente");
      if (form[0].checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      } 
      form.addClass('was-validated');
      if(form[0].checkValidity() === true){
        e.preventDefault();

        //Adicionando
        const inputs = $("#add_paciente").serializeArray();
        const data = {};

        inputs.forEach((input) => {
          data[input.name] = input.value;
        });

        this.model.add(data);
        $("#add_paciente input").val("");
        this.build();

        form.removeClass("was-validated");
      }
    });
  }

  setupEdit(paciente) {
    $(`#btn-edit-${paciente.id}`).click(() => {
      $("#id").val(paciente.id);
      $("#nome_edit").val(paciente.nome);
      $("#email_edit").val(paciente.email);
      $("#telefone_edit").val(paciente.telefone);
      $("#cpf_edit").val(paciente.cpf);
      $("#rg_edit").val(paciente.rg);
      $("#cep_edit").val(paciente.cep);

      this.editModal.show();
    });
  }

  setupDelete(paciente) {
    $(`#btn-del-${paciente.id}`).click(() => {
      let confirmarDel = confirm("Deseja mesmo excluir este paciente?");
      if(confirmarDel){
        this.model.delete(paciente.id);
        this.delToast.show({ autohide: true });
        this.checkArray();
        this.build();
      }
    });
  }

  build() {

    $(this.seletor).empty();

    this.model.pacientes.forEach((paciente) => {
      $(this.seletor).append(`
      <tr>
        <td>${paciente.id}</td>
        <td>${paciente.nome}</td>
        <td>${paciente.email}</td>
        <td>${paciente.telefone}</td>
        <td>${paciente.cpf}</td>
        <td>${paciente.rg}</td>
        <td>${paciente.cep}</td>
        <td>
          <button id="btn-edit-${paciente.id}" class="btn btn-warning btn-sm">
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button id="btn-del-${paciente.id}" class="btn btn-danger btn-sm">
            <i class="bi bi-trash-fill"></i
          </button>
        </td>
      </tr>
      `);

      this.checkArray();
      this.setupEdit(paciente);
      this.setupDelete(paciente);
    });
    
  }

  checkArray(){
    if(typeof this.model.pacientes != "undefined" && this.model.pacientes != null && this.model.pacientes.length != null && this.model.pacientes.length > 0){
      $("#thead").show();
      $("#erro").remove();
    }else {
      $("#thead").hide();
      $('#cont-tabela').append(`<p id="erro">Não há registros</p>`);
    }
  }
}
