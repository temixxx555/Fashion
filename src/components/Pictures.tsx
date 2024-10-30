import image from "../assets/Screenshot 2024-10-28 210403.png"

const Pictures = () => {

    return (
        <div className="container mx-auto pt-4 px-4 relative">
          <figure className="relative w-full">
            <div className="relative w-full pb-[75%] md:pb-[50%] lg:pb-[40%]">
              <img
                src={image}
                alt="Fashion showcase"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            {/* Featured overlay - positioned absolutely */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white rounded-lg shadow-lg p-4 max-w-xs md:max-w-sm">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-black">
                  GET FEATURED
                </h2>
                <p className="text-sm md:text-base text-gray-700">
                  Looking to make a Statement in our pieces? Don't worry we see you, get featured on our site with the hashtag 
                  <span className="font-semibold"> #garmisland</span> on any of your social media platforms when you post.
                </p>
              </div>
            </div>
          </figure>
        </div>
      );
    };
    
export default Pictures;