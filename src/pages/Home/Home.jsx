import Gallery from "./Gallery/Gallery"
import HeroContainer from "./Hero/HeroContainer"
import PopularClasses from "./PopularClasses/PopularClasses"
import PopularTeacher from "./PopularTeacher/PopularTeacher"


const Home = () => {
  
  return (
    <section>
      <HeroContainer/>
      <div className="max-w-screen-xl mx-auto">
        <Gallery/>
        <PopularClasses/>
        <PopularTeacher/>
      </div>
    </section>
  )
}

export default Home
