import PacientesModel from "./pacientesModel.js";
import PacientesController from "./pacientesController.js";

jQuery(() => {
  const model = new PacientesModel();
  const controller = new PacientesController("#pacientes", model);
  controller.checkArray();
  controller.build();
});

