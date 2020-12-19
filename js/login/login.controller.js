class login extends formController{
  eventBtn = $('#login');
  entity = 'login';

  login(){
    if (this.validateFormData()) {
      this.service.registerData(this.entity, this.getFormData()).then((response) => {
        const loginData = JSON.stringify(response.data);
        sessionStorage.setItem('user', loginData);
        location.href = '/views/users/admin-dashboard.html'; //Dashboard
      });
    }
  }  
}

const controller = new login();

  $(controller.eventBtn).on('click', () => {
    controller.login();
  });