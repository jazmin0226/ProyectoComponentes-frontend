class ordenesAdmin {

    service = new service;
    entity= 'orders';
    ordersData;
    newListPendingOrders = [];

    constructor(){
        setTimeout (()=>{
            this.getPendingData();
        }, 2000);

    }

    getPendingData(){

        this.service.getData(`${this.entity}/all/pending`).then((response) => {
            this.ordersData = response.newData;

            console.log(this.ordersData);
            

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


}

const controller = new ordenesAdmin();