class GeneralController {
  service = new service();
  logOut = $('#logout');
  authService = authService;  
  newOrder = $('#newOrder');

  validateView() {
    if(this.authService.userRole != 1){ //Si es un cliente
      if(!document.getElementById('retrieveByUser')){
        location.href = '/views/orders/retrievebyuser.view.html';
      }
    }
  }

  createOrder() {
    this.service.registerData('orders', { user: this.authService.currentUserId }).then(response => {
      localStorage.setItem('currentOrder', response.newData._id);
      location.href = '/views/orders/register.view.html';
    });
    //AGREGAR REDIRECIONAMIENTO
  }

  
}

const generalController = new GeneralController();

$(generalController.logOut).on('click', () => {
  generalController.authService.logOut();
});

$(window).on('load', () => {
  generalController.authService.validateUserActive();
  generalController.validateView();
});


$(generalController.newOrder).on('click', () => {
  generalController.createOrder();
});