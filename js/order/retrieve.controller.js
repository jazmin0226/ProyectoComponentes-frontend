class retrieveController extends listController {

  entity = 'orders'; //Entidad para el SERVICIO
  currentOrders;
  currentIndexProduct;
  newCurrentOrders = [];
  

  constructor() {
    super();
    this.fillData();
  }

  fillData() {
    this.service.getData(this.entity).then((response) => {
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
    const products = this.currentOrders[index].products;
    const newProductsList = [];

    for (const product of products) {
      console.log(product);
      const productData = {
        _id: product.productId._id,
        name: product.productId.name,
        color: product.productId.color,
        description: product.productId.description,
        quantity: product.quantity
      };

      newProductsList.push(productData);
    }
      
    this.fillModalTable(newProductsList, "", "")

    console.log(products);
  }

  fillModalTable(arrayData, typeBtn, btnMsg) {
    const table = $('#tableModalId')[0];
    const bodyTable = $('#bodyTableModal');
    

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
}

const controller = new retrieveController();