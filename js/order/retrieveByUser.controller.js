class retrieveByUser extends listController {
  entity= 'orders';
  currentOrders;
  currentIndexProduct;
  newCurrentOrders = [];
  modalBtn = $('#send');
  currentOrderId= '';
  currenteOrderState = '';
  
  constructor() {
    super();
    setTimeout(() => {
      this.fillData();
    }, 2000);
  }

  fillData() {
    this.newCurrentOrders = [];

    this.service.getData(`${this.entity}/${authService.currentUserId}`).then((response) => {
      this.currentOrders = response.newData;
      
      for (const order of this.currentOrders) {
        const orderData = {
          _id: order._id,
          name: order.user.name,
          id: order.user.id,
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
    this.currentOrderId = currentOrder._id;
    console.log(this.currentOrderId);
    this.currenteOrderState = currentOrder.state;
    const products = currentOrder.products;
    const newProductsList = [];

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
    this.fillModalTable(newProductsList, this.validateState());
  }

  validateState(){
    if(this.currenteOrderState === "Creado"){
      return true;
    }
  }

  updateOrder() {
    if(this.validateState()){
      const footer = $('#mfooter');
      const button = `<button type="button" class="btn btn-info btnUpdateOrder" data-id="${this.currentOrderId}" id="btnUpdate">Modificar pedido</button>`;
      footer.append(button);

      $('#btnUpdate').on('click', () => {
        localStorage.setItem('currentOrder' , this.currentOrderId);
        location.href = '/views/orders/register.view.html';
      }); 
    }
  }

  fillModalTable(arrayData, state) {
    const table = $('#tableModalId')[0];
    const bodyTable = $('#bodyTableModal');
    
    bodyTable.empty();

    for (let i = 0; i < arrayData.length; i++) {
      const currentData = arrayData[i];

      let elementTable = '<tr> <td>';
      let button = '';
      let editButton = ''; //para editar la cantidad. 

      for (const key in currentData) {
        if (currentData.hasOwnProperty(key)) {
          let element = currentData[key]; 
          if(key === '_id') {
            element = i + 1;
          }
          
          elementTable += `${element}</td><td>`;

          if(state === true){
            button = `<button type="button" class="btn btn-info deleteButton" data-id="${currentData._id}" id="btnDelete">Eliminar</button>`;
          }
        }
      }
      elementTable += `${button}</td></tr>`;
      bodyTable.append(elementTable);
    }
    this.addDeleteEvent();
    this.updateOrder();
  }

  addDeleteEvent() {
    const buttons = $('.deleteButton');
    for (const button of buttons) {
      $(button).on('click', () => {
        this.deleteProductOrder(button.dataset.id);
      });
    }
  }

  deleteProductOrder(idProduct){
    const body = {productId: idProduct};
    this.service.deleteData(`${this.entity}/delete/${this.currentOrderId}`, body).then((response) => {
      console.log(response);
    });
  }

}

const controller = new retrieveByUser();



$('#modalId').on('hidden.bs.modal', () => {
  $('#btnUpdate').remove();
  $('#tableModalId').empty();
});