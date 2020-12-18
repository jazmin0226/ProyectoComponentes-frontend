class retrieveController extends listController{

  entity = 'users'; //Entidad para el SERVICIO
  currentUsers;
  currentIndexUser;
  
  constructor (){
    super();
    this.fillData();

  }

  fillData(){
    this.service.getData(this.entity).then((response) => {
      this.currentUsers = response.newData;
      this.fillTable(this.currentUsers, "editButton", "Editar");
      this.addEditEvent();
    });
  }

  addEditEvent(){
    const button = $('.editButton');
    for(const buttons of button){
      $(buttons).on('click',()=>{
        this.showModalEdit(buttons.dataset.id);
      });
    }
  }

  showModalEdit(elementId){
    const index = Number (elementId);
    const currentUser = this.currentUsers[index];
    const type = $('#type')[0];
    const id = $('#id')[0];
    const name= $('#name')[0];
    const phone = $('#phone')[0];
    const mail = $('#mail')[0];
    const address = $('#address')[0];

    this.currentIndexUser = index;
    type.value = currentUser.type;
    id.value = currentUser.id;
    name.value = currentUser.name;
    phone.value = currentUser.phone;
    mail.value = currentUser.mail;
    address.value = currentUser.address;

    $('#btnUpdate').on('click',()=>{
      this.updateData();

    });

  }

  updateData(){

    const currentUser = this.currentUsers[this.currentIndexUser];
    const currentUpdateData = this.getFormData();
    const newData = Object.assign(currentUser,currentUpdateData);

    this.service.updateData(`${this.entity}/${newData.id}`, newData).then(response => {
      this.showSuccess("", "Se ha actualizado correctamente.");
      $('#modalId').modal('hide');
      this.fillData();
    });
  }
}
  
const controller = new retrieveController();