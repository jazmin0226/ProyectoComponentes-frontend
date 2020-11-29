class AuthService {
  request = $.ajax;
  baseUrl = 'http://localhost:3000/'; //'https://proyectofinalcomp.azurewebsites.net/'
  #currentUserActive;

  get userRole() {
    return Number(this.#currentUserActive.user.role.id);
  }

  validateUserActive() {
    let user = sessionStorage.getItem('user');

    if(user === null) {
      location.href = '/views/login.html';
    }

    this.#currentUserActive = JSON.parse(user);

    this.validateViews();
  }

  validateViews() {
    const options = $('.optionsMenu');
    
    for (const option of options) {
      if(option.dataset.user != this.userRole) {
        option.remove();
      }
    }
  }

  logOut() {
    sessionStorage.removeItem('user');
    location.href = '/views/login.html';
  }

}

const authService = new AuthService();

