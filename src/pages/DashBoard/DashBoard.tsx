import React, { useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard'
import { FaUser } from 'react-icons/fa'
import { useGetEmployeesQuery } from '../../features/employee/employeeApi'
import { IEmployee } from '../../models/employee.model'
import { useLocation } from 'react-router-dom'


const DashBoard = () => {
    
    const [employeeData, setEmployeeData] = useState<IEmployee | null>(null)
    const { data, error, isLoading, isSuccess } = useGetEmployeesQuery()
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const hightlightedUserId = queryParams.get('highlight')

    return (
        <div className="grid grid-cols-auto-fill gap-4 px-[1rem] pb-[2rem] pt-[1rem] ">

            {
                isLoading && <div className="fixed left-0 top-0 flex justify-center w-full h-screen">
                    <span className='text-5xl text-white mt-[19rem] font-[900]'>
                        LOADING.....
                    </span>
                </div>
            }
            {
                error && <div className="fixed flex left-0 top-0 bg-red-700 justify-center w-full h-screen">
                    <span className='text-5xl text-white  mt-[19rem] font-[900]'>
                        ERROR
                    </span>
                </div>
            }

            {
                isSuccess && data.map((employee: IEmployee) => {
                    return <EmployeeCard data={employee} hightlightedUserId={hightlightedUserId} setEmployeeData={setEmployeeData} />
                })
            }

            {
                employeeData &&
                <Modal setEmployeeData={setEmployeeData} onClose={() => { setEmployeeData(null) }}>
                    <>
                        <div className='max-w-[30rem] h-[20rem] w-full sm:border z-[300] border-white oveflow-hidden rounded-md mt-[2rem] flex flex-col items-center justify-center bg-neutral-900'>
                            <div className="w-[10rem] h-[10rem] bg-gray-700 flex items-center justify-center rounded-full overflow-hidden">
                                <FaUser className="text-[4rem] text-yellow-400" />
                            </div>
                            <div className='w-full max-w-[20rem] items-center flex flex-col'>
                                <div className='text-white w-full truncate text-xl text-center font-[500]'>{employeeData.firstname + " " + employeeData.lastname}</div>
                                <div className='text-white w-full truncate text-center'>{employeeData.email}</div>
                                <div className='text-white w-full truncate text-center'>{employeeData.country}</div>
                            </div>
                        </div>
                    </>
                </Modal>
            }

        </div>
    )
}

export default DashBoard