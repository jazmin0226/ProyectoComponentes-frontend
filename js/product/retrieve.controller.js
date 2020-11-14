class retrieveController extends listController{

  entity = 'products'; //Entidad para el SERVICIO
  currentProducts;

  constructor (){
    super();
    this.service.getData(this.entity).then((response) => {
      this.currentProducts = response.newData;
      this.fillTable(this.currentProducts);
      this.addEditEvent();
      this.hideLoading();
    });
  }

  addEditEvent() {
    const buttons = $('.editButton');
    for (const button of buttons) {
      $(button).on('click', () => {
          this.showModalEdit(button.dataset.id);
      });
    }
  }

  showModalEdit(elementId) {
    const index = Number(elementId);
    const currentProduct = this.currentProducts[index - 1];
    const name = $('#name')[0];
    const color = $('#color')[0];
    const description = $('#description')[0];

    name.value = currentProduct.name;
    color.value = currentProduct.color;
    description.value = currentProduct.description;
  }
}

const controller = new retrieveController();