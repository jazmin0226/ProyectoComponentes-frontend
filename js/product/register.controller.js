class registerController extends formController {
  eventBtn = $('#save');
  entity = 'products'; //Entidad para el SERVICIO

  registerData() {
    if (this.validateFormData()) {
      this.service.registerData(this.entity, this.getFormData()).then((response) => {
        this.showSuccess("", "Se ha registrado correctamente.");
      });
    } else {
      this.showAlert();
    }
  }
}

const controller = new registerController();

$(controller.eventBtn).on('click', () => {
  controller.registerData();
});