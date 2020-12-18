class ordenesCliente {
    service = new service;
    entity = 'orders';
    pendingOrders;
    newListPendingOrders = [];
    newListCreatedOrders = [];

    constructor() {
        setTimeout(() => {
            this.getOrderData();
            this.getOrderDataCreated();
        }, 2000);
    }

    getOrderData() {
        this.service.getData(`${this.entity}/statepending/5fc4492384afd02ab48d5029`).then((response) => {
            this.pendingOrders = response.newData;

            for (const order of this.pendingOrders) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    state: order.state
                };

                this.newListPendingOrders.push(orderData);
            };
            this.fillDataPending();
        });
    }

    getOrderDataCreated() {
        this.service.getData(`${this.entity}/statecreated/5fc4492384afd02ab48d5029`).then((response) => {
            this.pendingOrders = response.newData;

            for (const order of this.pendingOrders) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    state: order.state
                };

                this.newListCreatedOrders.push(orderData);
            };
            this.fillDataCreated();
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

    fillDataCreated() {
        const bodyTable = $('#bodyTableCreated');
        bodyTable.empty();


        for (let i = 0; i <  this.newListCreatedOrders.length; i++) {
            const currentData =  this.newListCreatedOrders[i];

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