class listController extends formController{
  service = new service;
  table = $('#tableId')[0];
  bodyTable = $('#bodyTable');
  loadingElement = $('#loading');

  clearTable(){
    this.bodyTable[0].innerHTML  = "";
  }

  fillTable(arrayData, typeBtn, btnMsg) {
    this.clearTable();
    
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
          button = `<button type="button" class="btn btn-info ${typeBtn}" data-id="${i}" data-toggle="modal" data-target="#modalId">${btnMsg}</button>`;
        }
      }
      elementTable += `${button}</td></tr>`;
      this.bodyTable.append(elementTable);
    }
  }
  
  hideLoading() {
    this.loadingElement.hide();
  }
}