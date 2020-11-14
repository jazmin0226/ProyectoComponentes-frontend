class registerController extends formController {
  eventBtn = $('#save');
  entity = 'users'; //Entidad para el SERVICIO

  registerData() {
    if (this.validateFormData()) {
      this.service.registerData(this.entity, this.getFormData()).then((response) => {
        //console.log(response);
        this.showSuccess('Registro correcto','Se registró correctamente');
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