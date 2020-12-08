class retrieveController extends listController {
  service = new service();
  entity = 'orders'; //Entidad para el SERVICIO
  currentProducts; //todos los productos
  currentOrder; //orden actual
  btnAdd; //Abre el modal y asigna el producto actual para la cantidad deseada.
  btnQuantity = $('.quantity');
  quantity = $('#quantity')[0];
  btnAddToOrder = $('#btnAddToOrder');
  currentProductIndex; //Indice del producto en la tabla para seleccionar la cantidad en el modal
  btnClearQuantity = $('#clearQuantity');//boton de cancelar del modal

  constructor() {
    super();
    this.fillData();
    this.getCurrentOrder();
    this.resetQuantity();
  }

  getCurrentOrder() {
    const currentOrder = localStorage.getItem('currentOrder');

    if (currentOrder == null) {
      //location.href = ''
    }
    this.currentOrder = currentOrder;
  }

  fillData() {
    this.service.getData('products').then((response) => {
      this.currentProducts = response.newData;
      this.fillTable(this.currentProducts, "addToOrder", "Agregar al pedido");
      this.hideLoading();
      this.btnAdd = $('.addToOrder');
      this.addEvent();
    });
  }

  addEvent() {
    for (const button of this.btnAdd) {
      $(button).on('click', () => {
        // this.addOrderProduct(button.dataset.id);
        this.currentProductIndex = Number(button.dataset.id);
      });
    }
  }

  addOrderProduct() {
    const product = this.currentProducts[this.currentProductIndex];
    const msgOrder = {
      productId: product._id,
      quantity: Number(this.quantity.value)
    };
    const jsonData = JSON.stringify(msgOrder);

    $('#modalId').modal('hide');
    this.resetQuantity();

    this.service.updateData(`${this.entity}/${this.currentOrder}`,{ id: jsonData });
    console.log('ordenId', this.currentOrder);
    
  }

  validateQuantity(event) {
    if (event === "add") {
      this.quantity.value++;
    } else {
      if (this.quantity.value > 1) {
        this.quantity.value--;
      }
    }
  }

  resetQuantity() {
    this.quantity.value = 1;
    this.currentProductIndex = -1;
  }
}

const controller = new retrieveController();

$(controller.btnQuantity).on('click', function () {
  controller.validateQuantity(this.dataset.event);
});

$(controller.btnAddToOrder).on('click', () => {
  controller.addOrderProduct();
});


$(controller.btnClearQuantity).on('click', () => {
  controller.resetQuantity();
});