class retrieveController extends listController{

  entity = 'users'; //Entidad para el SERVICIO
  currentUsers;
  
  constructor (){
    super();
    this.fillData();

  }

  fillData(){
    this.service.getData(this.entity).then((response) => {
      this.currentUsers = response.newData;
      this.fillTable(this.currentUsers);
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
}
  
const controller = new retrieveController();