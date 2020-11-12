class listController {
  service = new service;
  table = $('#tableId')[0];
  bodyTable = $('#bodyTable');

  fillTable(arrayData) {
    for (const currentData of arrayData) {
      let elementTable = '<tr> <td>';
      
      for (const key in currentData) {
        if (currentData.hasOwnProperty(key)) {
          const element = currentData[key];
          elementTable +=`${element}</td><td>` 
        }
      }
      elementTable += '</td></tr>';
      this.bodyTable.append(elementTable);
    }
  }
}