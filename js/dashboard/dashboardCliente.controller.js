class ordenesCliente {
    service = new service;
    entity = 'orders';
    pendingOrders;
    newListPendingOrders = [];

    constructor() {
        setTimeout(() => {
            this.getOrderData();
          }, 2000);
    }

    getOrderData() {
        this.service.getData(`${this.entity}/userstate/5fc4492384afd02ab48d5029`).then((response) => {
            this.pendingOrders = response.newData;

            for (const order of this.pendingOrders) {
                const orderData = {
                    _id: order._id,
                    name: order.user.name,
                    id: order.user.id,
                    state: order.state
                };

                this.newListPendingOrders.push(orderData);
            };
            this.fillDataPending();
        });
    }

    fillDataPending() {
        const bodyTable = $('#bodyTablePending');
        bodyTable.empty();


        for (let i = 0; i <  this.newListPendingOrders.length; i++) {
            const currentData =  this.newListPendingOrders[i];

            let elementTable = '<tr> <td>';

            for (const key in currentData) {
                if (currentData.hasOwnProperty(key)) {
                    let element = currentData[key];
                    if (key === '_id') {
                        element = i + 1;
                    }

                    elementTable += `${element}</td><td>`;
                }
            }
            bodyTable.append(elementTable);
        }
    }
}

const controller = new ordenesCliente();