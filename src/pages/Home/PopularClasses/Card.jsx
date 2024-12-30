import {Link} from "react-router-dom"

const Card = ({item}) => {
    //console.log(item)
    const {_id, name, Image, availableSeats, price, totalEnrolled } = item;
  return (
    <div className="flex flex-col justify-between p-3 m-4 overflow-hidden border rounded-lg shadow-lg border-secondary">
      <img src={Image} alt="" />
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold dark:text-white">{name}</h2>
        <p className="mb-2 text-gray-600">Available Seats: {availableSeats}</p>
        <p className="mb-2 text-gray-600"> Price: LKR {price}</p>
        <p className="mb-2 text-gray-600">Total Students: {totalEnrolled}</p>
        <Link to={`class/${_id}`} className="mt-2 text-center">
            <button className="w-full px-2 py-1 mt-2 font-bold text-white bg-secondary rounded-xl">Select</button>
        </Link>
      </div>
    </div>
  )
}

export default Card
