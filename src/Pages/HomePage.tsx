import Collection from "@/components/Collection";
import image from "../assets/Screenshot 2024-10-24 215002.png";
import image2 from "../assets/Screenshot 2024-10-24 235958.png";
import { Link } from "react-router-dom";
import PopularCategories from "@/components/PopularCategories";
import MaisonCollect from "@/components/MaisonCollect";
import image4 from "../assets/Screenshot 2024-10-26 225338.png"
import Messages from "@/components/Messages";
import Pictures from "@/components/Pictures";
const HomePage = () => {
  return (
    <>
      <img
        src={image}
        className='w-full h-auto object-fit aspect-[16/9]'
        alt='Homepage Screenshot'
      />

      <Collection />
      <Link
                to={`/fitness`}
                className='block relative'
              >
      <img
        src={image2}
        className='w-full h-auto object-cover'
        alt='Homepage Screenshot'
      />
      </Link>

      <PopularCategories />
      <Link
                to={`/jersey`}
                className='block relative'
              >
      <img
        src={image4}
        className='w-full h-auto object-cover'
        alt='Homepage Screenshot'
      />
      </Link>

       <MaisonCollect />

      
      <Pictures />

      <Messages />
    </>
  );
};

export default HomePage;
