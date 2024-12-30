import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/effect-creative';  // Import the CSS for the effect
import { EffectCreative } from 'swiper/modules';  // Correct import for the effect
import 'swiper/css';
import Hero from './Hero';
import Hero2 from './Hero2';

const HeroContainer = () => {
  return (
    <section>
        <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
            prev:{
                shadow: true,
                translate: ["-120%", 0,-500]
            },
            next:{
                shadow: true,
                translate:["120%", 0,-500]
            }
        }}
        modules = {[EffectCreative]}
        className='mySwiperS'
        loop={true}
        autoplay={
            {
                delay: 250,
                disableOnInteraction: false,
            }
        }
        >
           <SwiperSlide>
            <Hero/>
           </SwiperSlide>
           <SwiperSlide>
            <Hero2/>
           </SwiperSlide>
        </Swiper>
    </section>
  )
}

export default HeroContainer
