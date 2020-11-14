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
    const currentProduct = this.currentProducts[index];
    const name = $('#name')[0];
    const color = $('#color')[0];
    const description = $('#description')[0];

    this.currentIndexProduct = index;
    name.value = currentProduct.name;
    color.value = currentProduct.color;
    description.value = currentProduct.description;

    $('#btnUpdate').on('click', () => {
      this.updateData();
    });
  }

  updateData() {
    const currentProduct = this.currentProducts[this.currentIndexProduct];
    const currentUpdateData = this.getFormData();
    const newData = Object.assign(currentProduct, currentUpdateData);

    this.service.updateData(`${this.entity}/${newData._id}`, newData).then(response => {
      this.showSuccess("", "Se ha actualizado correctamente.");
      $('#modalId').modal('hide');
      this.fillData();
    });
  }
}

const controller = new retrieveController();