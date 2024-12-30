import { useNavigate } from 'react-router-dom'
import bgImg from '../../../assets/home/banner-1.jpg'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cover" style={{backgroundImage:`url(${bgImg})` }}>
      <div className='flex items-center justify-start min-h-screen text-white bg-black pl-11 bg-opacity-60'>
        <div>
          <div className='space-y-4'>
              <p className='text-2xl md:text-4xl'>We Provide</p>
              <h1 className='text-4xl font-bold md:text-7xl'>Best Learning Courses</h1>
              <div className='md:w-1/2'>
                <p>Empowering learners with high-quality courses crafted by industry professionals. Join today and unlock your potential with the best resources and support</p>
              </div>
              <div className='flex flex-wrap items-center gap-5'>
                <button className='py-3 font-bold uppercase rounded-lg px-7 bg-secondary' >Join Today</button>
                <button onClick={() => navigate('/classes')} className='py-3 font-bold uppercase border rounded-lg px-7 hover:bg-secondary' >View Courses</button>
              </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Hero
