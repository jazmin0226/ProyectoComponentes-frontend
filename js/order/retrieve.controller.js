class retrieveController extends listController {

  entity = 'orders'; //Entidad para el SERVICIO
  currentOrders;
  currentIndexProduct;
  newCurrentOrders = [];
  modalBtn = $('#send');
  currentOrderId= '';
  currenteOrderState = '';
  

  constructor() {
    super();
    this.fillData();
  }

  fillData() {
    this.newCurrentOrders = [];
    this.service.getData(this.entity).then((response) => {
      this.currentOrders = response.newData;
      
      for (const order of this.currentOrders) {
        const orderData = {
          _id: order._id,
          name: order.user.name,
          id: order.user.id,
          address: order.user.address,
          state: order.state
        };

        this.newCurrentOrders.push(orderData);
      };

      this.fillTable(this.newCurrentOrders, "btnMore", "Ver más");
      this.btnMore();
      this.hideLoading();
    });
  }

  btnMore() {
    const buttons = $('.btnMore');
    for (const button of buttons) {
      $(button).on('click', () => {
        this.showModal(button.dataset.id);
      });
    }
  }

  showModal(elementId){
    const index = Number(elementId);
    const currentOrder = this.currentOrders[index];
    const products = currentOrder.products;
    const newProductsList = [];
    
    this.currentOrderId = currentOrder._id;
    this.currenteOrderState = currentOrder.state;

    for (const product of products) {
      const productData = {
        _id: product.productId._id,
        name: product.productId.name,
        color: product.productId.color,
        description: product.productId.description,
        quantity: product.quantity
      };

      newProductsList.push(productData);
    }

    if(this.currenteOrderState === "Entregado"){
      $('#send').hide();
    }
    
    this.fillModalTable(newProductsList);
  }

  fillModalTable(arrayData) {
    const table = $('#tableModalId')[0];
    const bodyTable = $('#bodyTableModal');
    
    bodyTable.empty();

    for (let i = 0; i < arrayData.length; i++) {
      const currentData = arrayData[i];

      let elementTable = '<tr> <td>';
      let button;
      

      for (const key in currentData) {
        if (currentData.hasOwnProperty(key)) {
          let element = currentData[key]; 
          if(key === '_id') {
            element = i + 1;
          }

          elementTable += `${element}</td><td>`;
        }
      }
      bodyTable.append(elementTable);
    }
  }

  changeState(){
    const body = {state: ""};
    switch(this.currenteOrderState){
      case "Pendiente":
        body.state = "Enviado";
      break;
      case "Enviado":
        body.state = "Entregado";
      break;
    }
    this.service.updateData(`${this.entity}/updatestate/${this.currentOrderId}`, body).then((response) => {
      
      this.fillData();
      this.showSuccess("", "Se ha actualizado correctamente.");
    });
  }
}

const controller = new retrieveController();

$(controller.modalBtn).on('click', () => {
  controller.changeState();
});

$('#modalId').on('hidden.bs.modal', () => {
  $('#send').show();
});
