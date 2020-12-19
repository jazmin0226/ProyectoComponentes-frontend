class AuthService {
  request = $.ajax;
  #currentUserActive;

  get userRole() {
    return Number(this.#currentUserActive.user.role.id);
  }

  get currentUserId(){
    return this.#currentUserActive.user._id;
  }

  validateUserActive() {
    let user = sessionStorage.getItem('user');

    if(user === null) {
      location.href = '/views/login.html';
    }

    this.#currentUserActive = JSON.parse(user);

    this.validateOptions(); //Valida las opciones del Menú
  }

  validateOptions() {
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

