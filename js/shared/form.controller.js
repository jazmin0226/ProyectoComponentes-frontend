class formController {
  service = new service();
  form = $('#formId')[0];

  //Obtiene los datos del formulario y los convierte en un Object
  getFormData() {
    const parameters = {};
    for (const element of this.form.elements) {
      if (element.type !== 'button') {
        parameters[element.id] = element.value;
      }
    }
    return parameters;
  }

  //Valida los datos del formulario
  validateFormData() {
    let valid = true;
    for (const element of this.form.elements) {
      if (element.type !== 'button' && element.required === true) {
        if (element.value === "") {
          valid = false
        }
      }
    }
    return valid;
  }

  // Muestra retroalimentacion de error
  showAlert() {
    swal("Error", "Hay datos requeridos vacios", "error");
  }


  // Muestra retroalimentacion
  showSuccess(tittle,msg) {
    swal(tittle, msg, "success");
    if(this.form){
      this.form.reset();
    }
  }
}