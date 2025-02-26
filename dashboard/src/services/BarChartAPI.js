//an API without auth key

class ApiFetcherDoughnut {
    static async getData() { // Ensure this method is static
      try {
        const response = await fetch('https://run.mocky.io/v3/2df4c33d-072d-474a-a7cc-80c5aa4a995c');
        const data = await response.json();
        console.log("data:", data); // Log data to console
        return data; // Return data properly
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }
  }
  
  export default ApiFetcherDoughnut; // Export the class