class retrieveController extends listController{

  entity = 'products'; //Entidad para el SERVICIO
  currentProducts;
  currentIndexProduct;

  constructor (){
    super();
    this.fillData();
  }

  fillData() {
    this.service.getData(this.entity).then((response) => {
      this.currentProducts = response.newData;
      this.fillTable(this.currentProducts, "info", "Agregar al pedido");
      //this.addEditEvent();
      this.hideLoading();
    });
  }

  // addShoppinCartEvent() {
  //   const buttons = $('.editButton');
  //   for (const button of buttons) {
  //     $(button).on('click', () => {
          
  //     });
  //   }
  // }

  
}

const controller = new retrieveController();