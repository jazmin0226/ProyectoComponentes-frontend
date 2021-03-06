class ordenesAdmin {

    service = new service;
    entity= 'orders';
    ordersData;
    newListPendingOrders = [];
    newListSentOrders = [];
    newListDeliveredOrders = [];
    

    constructor(){
        setTimeout (()=>{
            this.getPendingData();
            this.getSentData();
            this.getDeliveredData();
        }, 2000);

    }

    getPendingData(){

        this.service.getData(`${this.entity}/all/pending`).then((response) => {
            this.ordersData = response.newData;

            
            

            for (const order of this.ordersData) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    name: order.user.name,
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

    getSentData(){

        this.service.getData(`${this.entity}/all/sent`).then((response) => {
            this.ordersData = response.newData;

            
            

            for (const order of this.ordersData) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    name: order.user.name,
                    state: order.state
                };

                this.newListSentOrders.push(orderData);
                
            };
            this.fillDataSent();
           

        });

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

    getDeliveredData(){

        this.service.getData(`${this.entity}/all/delivered`).then((response) => {
            this.ordersData = response.newData;

            
            

            for (const order of this.ordersData) {
                const orderData = {
                    _id: order._id,
                    id: order.user.id,
                    name: order.user.name,
                    state: order.state
                };

                this.newListDeliveredOrders.push(orderData);
                
            };
            this.fillDataDelivered();
           

        });

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

const controller = new ordenesAdmin();