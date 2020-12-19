class ordenesCliente {
    service = new service;
    entity = 'orders';
    ordersData;
    newListPendingOrders = [];
    newListCreatedOrders = [];
    newListSentOrders = [];
    newListDeliveredOrders = [];

    constructor() {
        setTimeout(() => {
            this.getOrderData();
            this.getOrderDataCreated();
            this.getOrderDataSent();
            this.getOrderDataDelivered();
        }, 2000);
    }

    getOrderData() {
        this.service.getData(`${this.entity}/statepending/${authService.currentUserId}`).then((response) => {
            this.ordersData = response.newData;

            for (const order of this.ordersData) {
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
        this.service.getData(`${this.entity}/statecreated/${authService.currentUserId}`).then((response) => {
            this.ordersData = response.newData;

            for (const order of this.ordersData) {
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

    getOrderDataSent() {
        this.service.getData(`${this.entity}/statesent/${authService.currentUserId}`).then((response) => {
            this.ordersData = response.newData;

            for (const order of this.ordersData) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    state: order.state
                };

                this.newListSentOrders.push(orderData);
            };
            this.fillDataSent();
        });
    }


    getOrderDataDelivered() {
        this.service.getData(`${this.entity}/statedelivered/${authService.currentUserId}`).then((response) => {
            this.ordersData = response.newData;

            for (const order of this.ordersData) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    state: order.state
                };

                this.newListDeliveredOrders.push(orderData);
            };
            this.fillDataDelivered();
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

    fillDataSent() {
        const bodyTable = $('#bodyTableSent');
        bodyTable.empty();


        for (let i = 0; i <  this.newListSentOrders.length; i++) {
            const currentData =  this.newListSentOrders[i];

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

    fillDataDelivered() {
        const bodyTable = $('#bodyTableDelivered');
        bodyTable.empty();


        for (let i = 0; i <  this.newListDeliveredOrders.length; i++) {
            const currentData =  this.newListDeliveredOrders[i];

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