import proj1 from '../images/projWall/proj1.jpg'
import proj2 from '../images/projWall/proj2.jpg'
import proj3 from '../images/projWall/proj3.jpg'
import proj4 from '../images/projWall/proj4.jpg'
import proj5 from '../images/projWall/proj5.jpg'
function getRandomImage() {
    const images = [proj1, proj2, proj3,proj4,proj5];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];}
    export default getRandomImage;