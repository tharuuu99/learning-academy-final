import image1 from "../../../assets/gallery/image1.jpg"
import image2 from "../../../assets/gallery/image2.jpg"
import image3 from "../../../assets/gallery/image3.jpg"
import image4 from "../../../assets/gallery/image4.jpg"
import image5 from "../../../assets/gallery/image5.jpg"

const Gallery = () => {
  
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">Our Gallery</h1>
      </div>

      {/* image container */}
      <div className="grid items-center justify-center gap-4 md:grid-cols-2">
        <div className="mb-4 md:mb-0">
            <img src={image1} alt="" className="md:h-[720px] w-full mx-auto rounded-sm"/>
        </div>
        <div className="grid items-start grid-cols-2 gap-4">
            <div>
                <img src={image2} alt=""className="md:h-[350px] rounded-sm" />
            </div>
            <div>
                <img src={image3} alt=""className="md:h-[350px] rounded-sm" />
            </div>
            <div>
                <img src={image4} alt=""className="md:h-[350px] rounded-sm" />
            </div>
            <div>
                <img src={image5} alt=""className="md:h-[350px] rounded-sm" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
