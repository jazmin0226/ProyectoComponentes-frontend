class listController {
  service = new service;
  table = $('#tableId')[0];
  bodyTable = $('#bodyTable');
  loadingElement = $('#loading');

  fillTable(arrayData) {
    for (const currentData of arrayData) {
      let elementTable = '<tr> <td>';
      let button;
      for (const key in currentData) {
        if (currentData.hasOwnProperty(key)) {
          const element = currentData[key];
          elementTable += `${element}</td><td>`;
          button = `<button type="button" class="btn btn-info editButton" data-id="${currentData.id}" data-toggle="modal" data-target="#modalId">Editar</button>`;
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