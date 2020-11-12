class retrieveController extends listController{

  entity = 'products'; //Entidad para el SERVICIO
  currentProducts;

  constructor (){
    super();
    this.service.getData(this.entity).then((response) => {
      this.currentProducts = response.newData;
      this.fillTable(this.currentProducts);
    });
  }
}

const controller = new retrieveController();