//an API with auth key

class ApiFetcher {
    static async getData() {
      try {
        const response = await fetch('https://your.api.endpoint.com/data', {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Use your API key here
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data:", data);
        return data;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }
  }
  
  export default ApiFetcher;
  