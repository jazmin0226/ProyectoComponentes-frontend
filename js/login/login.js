class login extends formController{
  eventBtn = $('#login');
  entity = 'login';

  login(){
    if (this.validateFormData()) {
      this.service.registerData(this.entity, this.getFormData()).then((response) => {
        sessionStorage.setItem('user', response);
        location.href = '/views/products/retrieve.view.html';
        console.log(sessionStorage);
      });
    }
  }  
}

const controller = new login();

  $(controller.eventBtn).on('click', () => {
    controller.login();
  });