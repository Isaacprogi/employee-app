import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { IEmployee } from '../../models/employee.model';
import { useDeleteEmployeeMutation } from '../../features/employee/employeeApi';
import {useState, useEffect} from 'react'


interface EmployeeCardProps {
  data: IEmployee;
  setEmployeeData: React.Dispatch<React.SetStateAction<IEmployee | null>>;
  hightlightedUserId:string | null
}


const EmployeeCard = ({ data, setEmployeeData,hightlightedUserId }: EmployeeCardProps) => {
  const [deleteEmployee,{isLoading:isDeleting}] = useDeleteEmployeeMutation()

  const navigate = useNavigate()

  const handleView = () => {
    setEmployeeData(data)
  }

  const [showShadow, setShowShadow] = useState<Boolean>(true);

  useEffect(() => {
    if (showShadow) {
      const timeoutId = setTimeout(() => {
        setShowShadow(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showShadow]);

  const handleDelete = () => {
    deleteEmployee(data)
    setEmployeeData(null)
  }

  const handleEdit = () => {
    return navigate(`/form/edit/${data.id}`)
  }


  return (
    <div className={` ${parseInt(hightlightedUserId || '')  === data.id && showShadow ?" shadow-md shadow-neutral-400 border-neutral-600 border-[.5px]":"border-neutral-600 border-[.5px]   "} bg-neutral-800 cursor-pointer group  rounded-md overflow-hidden`}>
      <div className="w-full max-w-[6rem] mt-[2rem] text-yellow-400 flex items-center justify-center h-6rem rounded-full overflow-hidden mx-auto">
        <span><FaUser className='text-5xl' /></span>
      </div>
      <div className='relative h-[8rem] overflow-hidden w-full flex flex-col items-center justify-center group-hover:scale-90 ease-in-out duration-300 cursor-pointer'>
        <p className='bg-gradient-to-r from-white  to-gray-600 text-3xl truncate px-3 bg-clip-text text-transparent  max-w-full'>{data.firstname}</p>
        <p className='text-white z-[12] truncate max-w-full px-3'>{data.lastname}</p>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 text-white p-2">
        <button disabled={isDeleting} onClick={handleView} className='text  w-full h-full flex items-center rounded-sm justify-center duration-300 bg-yellow-700 p-2 white hover:bg-neutral-700'>View</button>
        <button onClick={handleEdit} className='text white w-full h-full  p-2 flex items-center justify-center rounded-sm bg-yellow-700 duration-300 hover:bg-neutral-700'>Edit</button>
        <button onClick={handleDelete} className={`${isDeleting?"bg-neutral-500":" bg-yellow-700 "} text white w-full h-full  p-2 flex items-center justify-center rounded-sm  duration-300 hover:bg-neutral-700`}>Delete</button>
      </div>
    </div>
  )
}

export default EmployeeCard