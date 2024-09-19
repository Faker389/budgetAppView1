import { Link } from "react-router-dom"
export default function Footer(){
    return <div className='w-full h-20 bg-white absolute bottom-1.5 border-t-2 border-t-black self-end flex justify-around items-center'>
    <Link to="/"><i className="cursor-pointer text-3xl fa-solid fa-house"></i></Link>
    <Link to="/statistic"><i className="cursor-pointer text-3xl fa-solid fa-chart-simple"></i></Link>
    <Link to="/user"><i className="cursor-pointer text-3xl fa-solid fa-user"></i></Link>
  </div>
}