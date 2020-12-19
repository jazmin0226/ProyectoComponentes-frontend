class perfilAdminController extends formController{

    entity = 'users'; //Entidad para el SERVICIO
    currentUser = {};
    currentIndexUser;
    
    constructor (){
      super();
      setTimeout(() => {
        this.fillData();
      }, 2000);
    }

    fillData(){
        this.service.getData(`${this.entity}/${authService.currentUserNormalId}`).then((response) => {
          this.currentUser = response.newData;
          this.fillUserData();
          this.showModalEdit();
        });
    }
    
  
    fillUserData(){
        const userName= $('#nombreUsuario');
        const info = document.getElementById('info');
        
        userName.text(this.currentUser.name);
        info.innerHTML = `Número de teléfono: ${this.currentUser.phone} </br>
                        Correo: ${this.currentUser.mail} </br>
                        Dirección: ${this.currentUser.address}`;
        
    }
  
    showModalEdit(){
      const name= $('#name')[0];
      const phone = $('#phone')[0];
      const address = $('#address')[0];

      name.value = this.currentUser.name;
      phone.value = this.currentUser.phone;
      address.value = this.currentUser.address;
  
      $('#btnUpdate').on('click',()=>{
        this.updateData();
  
      });
  
    }
  
    updateData(){
      const currentUpdateData = this.getFormData();
      const newData = Object.assign(this.currentUser,currentUpdateData);
  
      this.service.updateData(`${this.entity}/${newData.id}`, newData).then(response => {
        this.showSuccess("", "Se ha actualizado correctamente.");
        $('#modalId').modal('hide');
        this.fillData();
      });
    }
  }
    
  const controller = new perfilAdminController();