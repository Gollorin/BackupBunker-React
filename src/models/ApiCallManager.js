class ApiCallManager {
    baseUrl = 'https://localhost:7187/api/Admin/';
  
    async callApi(endpoint, options) {

      try {
        console.log('Calling api!')

        const response = await fetch(`${this.baseUrl}${endpoint}`, options);

        if(response.ok) 
        {
          const data = await response.json();
          return data;
        } else 
        {
          console.log("Api call fail");
          return null;
        }

      } catch (error) {
        console.log("Api call fail");
        console.log(error);
        return null;
      }
    }
}

export default ApiCallManager;