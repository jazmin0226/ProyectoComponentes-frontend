class registerController extends formController {
  eventBtn = $('#save');
  entity = 'products'; //Entidad para el SERVICIO
  authService = authService;
  logOut = $('#logout')

  registerData() {
    if (this.validateFormData()) {
      this.service.registerData(this.entity, this.getFormData()).then((response) => {
        this.showSuccess("", "Se ha registrado correctamente.");
      });
    } else {
      this.showAlert();
    }
  }

  validateView() {
    if(this.authService.userRole != 1){
      location.href = '/views/orders/register.view.html';
    }
  }
}

const controller = new registerController();

$(controller.eventBtn).on('click', () => {
  controller.registerData();
});

$(window).on('load', () => {
  controller.authService.validateUserActive();
  controller.validateView();
})

$(controller.logOut).on('click', () => {
  controller.authService.logOut();
});