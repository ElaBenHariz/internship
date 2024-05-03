const getRandomColor = () => {
    // Generate a random light color by adding a higher base value
    const baseValue = 150; // You can adjust this value to control the overall brightness
    const letters = '0123456789ABCD';
    let color = '#';
    
    for (let i = 0; i < 3; i++) {
      const randomValue = Math.floor(Math.random() * 256);
      const lightColorComponent = Math.min(baseValue + randomValue, 255); // Ensure it doesn't exceed 255
      const hexComponent = lightColorComponent.toString(16).padStart(2, '0');
      color += hexComponent;
    }
  
    return color;
  };

  export default getRandomColor;