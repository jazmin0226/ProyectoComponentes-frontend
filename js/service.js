class service {
  request = $.ajax;
  baseUrl = 'http://localhost:3000/'; //'https://proyectofinalcomp.azurewebsites.net/'

  getData(entity){
    return new Promise((resolve, reject) => {
      this.request({
        url: `${this.baseUrl}${entity}`, 
        success: (response)=>{
          resolve (response);
        },
        error: (err)=>{
          reject(err);
        },
        type: "GET"
      });
    });
  }

  registerData(entity, body){
    return new Promise((resolve, reject) => {
      this.request({
        url:`${this.baseUrl}${entity}`,
        success: (response)=>{
          resolve (response);
        },
        error: (err)=>{
          reject(err);
        },
        type: "POST",
        data: body
      });
    });
  }

  updateData(entity, body){
    return new Promise((resolve, reject) => {
      this.request({
        url:`${this.baseUrl}${entity}`,
        success: (response)=>{
          resolve (response);
        },
        error: (err)=>{
          reject(err);
        },
        type: "PUT",
        data: body
      });
    })
    
  }

  deleteData(entity, body){
    return new Promise((resolve, reject) => {
      this.request({
        url:`${this.baseUrl}${entity}`,
        success: (response)=>{
          resolve (response);
        },
        error: (err)=>{
          reject(err);
        },
        type: "DELETE",
        data: body
      });
    })
  }
}