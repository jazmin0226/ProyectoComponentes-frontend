class retrieveByUser extends listController {
  entity = 'orders';
  currentOrders;
  currentIndexProduct;
  newCurrentOrders = [];
  modalBtn = $('#send');
  currentOrderId = '';
  currenteOrderState = '';
  productIndex = -1;

  constructor() {
    super();
    setTimeout(() => {
      this.fillData();
    }, 2000);
  }

  get currentOrder() {
    return this.currentOrders[this.productIndex];
  }

  get productsList() {
    const productList = [];

    for (const product of this.currentOrder.products) {
      const productData = {
        _id: product.productId._id,
        name: product.productId.name,
        color: product.productId.color,
        description: product.productId.description,
        quantity: product.quantity
      };

      productList.push(productData);
    }
    return productList;
  }


  clearProductIndex() {
    this.productIndex = -1;
  }

  fillData() {
    this.newCurrentOrders = [];

    this.service.getData(`${this.entity}/${authService.currentUserId}`).then((response) => {
      this.currentOrders = response.newData;

      for (const order of this.currentOrders) {
        const orderData = {
          _id: order._id,
          name: order.user.name,
          address: order.user.address,
          state: order.state
        };

        this.newCurrentOrders.push(orderData);
      };

      this.fillTable(this.newCurrentOrders, "btnMore", "Ver más");
      this.btnMore();
      this.hideLoading();

      if (this.productIndex !== -1) {
        this.fillModalTable();
        this.activeButtons();
      }
    });
  }

  btnMore() {
    const buttons = $('.btnMore');
    for (const button of buttons) {
      $(button).on('click', () => {
        this.productIndex = Number(button.dataset.id);
        this.showModal();
      });
    }
  }

  showModal() {
    this.currentOrderId = this.currentOrder._id;
    this.currenteOrderState = this.currentOrder.state;


    this.fillModalTable();
    this.updateOrder();

    if (this.productsList.length === 0) {
      $('#btnSend').hide();
    }
  }

  validateState() {
    if (this.currenteOrderState === "Creado") {
      return true;
    }
  }

  updateOrder() {
    if (this.validateState()) {
      const footer = $('#mfooter');
      const button = `<button type="button" class="btn btn-info btnUpdateOrder" id="btnUpdate">Modificar pedido</button>`;
      const btnSend = `<button type="button" class="btn btn-success btnUpdateOrder" id="btnSend">Enviar pedido</button>`;

      footer.prepend(button);
      footer.prepend(btnSend);

      $('#btnUpdate').on('click', () => {
        localStorage.setItem('currentOrder', this.currentOrderId);
        location.href = '/views/orders/register.view.html';
      });

      $('#btnSend').on('click', () => {
        this.sendOrder();
      });
    }
  }

  sendOrder() {
    console.log(this.currentOrderId);
    const updateBody = {
      state: "Pendiente"
    };
    const emailBody = {
      subject: "Confirmación",
      email: 'guzmanmaria2775@gmail.com'
    };
    const promises = [
      this.service.updateData(`${this.entity}/updatestate/${this.currentOrderId}`, updateBody),
      this.service.registerData(`${this.entity}/${this.currentOrderId}`, emailBody)
    ];

    $('#btnUpdate').attr('disable', true);
    $('#btnSend').attr('disable', true);

    Promise.all(promises).then((response) => {
      $('#modalId').modal('hide');
      this.fillData();
    });

  }

  fillModalTable() {
    const bodyTable = $('#bodyTableModal');

    bodyTable.empty();

    for (let i = 0; i < this.productsList.length; i++) {
      const currentData = this.productsList[i];

      let elementTable = '<tr> <td>';
      let button = '';

      for (const key in currentData) {
        if (currentData.hasOwnProperty(key)) {
          let element = currentData[key];
          if (key === '_id') {
            element = i + 1;
          }

          elementTable += `${element}</td><td>`;

          if (this.validateState()) {
            button = `<button type="button" class="btn btn-danger deleteButton" data-id=${currentData._id} id="btnDelete">Eliminar</button>`;
          }
        }
      }
      elementTable += `${button}</td></tr>`;
      bodyTable.append(elementTable);
    }

    this.addDeleteEvent();

  }

  addDeleteEvent() {
    const buttons = $('.deleteButton');
    for (const button of buttons) {
      $(button).on('click', () => {
        this.deleteProductOrder(button.dataset.id);
      });
    }
  }

  deleteProductOrder(idProduct) {
    const body = {
      productId: idProduct
    };

    this.disableButtons();
    this.service.deleteData(`${this.entity}/delete/${this.currentOrderId}`, body).then((response) => {
      this.fillData();

      if (this.productsList.length === 0) {
        $('#btnSend').hide();
      }
    });
  }

  disableButtons() {
    $('.deleteButton').attr('disabled', true);
    $('#btnUpdate').attr('disabled', true);
    $('#btnSend').attr('disabled', true);
  }

  activeButtons() {
    $('#btnUpdate').removeAttr('disabled');
    $('#btnSend').removeAttr('disabled');
  }


  removeButtons() {
    $('#btnUpdate').remove();
    $('#btnSend').remove();
  }



}

const controller = new retrieveByUser();

$('#modalId').on('hidden.bs.modal', () => {
  controller.removeButtons();
  controller.clearProductIndex();
  $('#btnSend').show();
});