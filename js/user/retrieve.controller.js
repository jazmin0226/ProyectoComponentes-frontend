class retrieveController extends listController{

    entity = 'users'; //Entidad para el SERVICIO
    currentUsers;
  
    constructor (){
      super();
      this.service.getData(this.entity).then((response) => {
        this.currentUsers = response.newData;
        this.fillTable(this.currentUsers);
      });
    }
}
  
const controller = new retrieveController();