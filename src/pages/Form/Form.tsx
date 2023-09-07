import { useState, ChangeEvent, FormEvent } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { IEmployee } from '../../models/employee.model';
import { useAddEmployeeMutation, useGetEmployeeQuery, useUpdateEmployeeMutation } from '../../features/employee/employeeApi';
import { useNavigate } from 'react-router-dom';

interface IProps {
    isEditForm?: Boolean
}

interface InputsFile1 {
    [key: string]: File;
}
interface InputsFile2 {
    [key: string]: string;
}

const Form = (props: IProps) => {

    const [inputs, setInputs] = useState<IEmployee>({ id: 0, firstname: "", lastname: "", email: "", country: "" });
    const [error, setError] = useState<String>('')
    const navigate = useNavigate()

    const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
    const [addEmployee, { isLoading: isAdding }] = useAddEmployeeMutation();

    const params = useParams();
    const userIdToEdit = useRef(parseInt(params.id || ""))
    const { data: employeeData, isSuccess } = useGetEmployeeQuery(userIdToEdit.current)


    //auto fill form only when its not in "submitting mode"
    useEffect(() => {
        if (props.isEditForm && employeeData) {
            setInputs(employeeData);
        }
    }, [props.isEditForm, employeeData]);


    //get inputs function
    const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        const { name } = e.target;
        if (e.target.files && e.target.files[0]) {
            let input: InputsFile1 = { [name]: e.target.files[0] };
            return setInputs({ ...inputs, ...input });
        }
        let input: InputsFile2 = { [name]: e.target.value };
        return setInputs({ ...inputs, ...input });

    };


    //form submit for both editing and adding an employee
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!inputs.firstname || !inputs.lastname || !inputs.email || !inputs.country) {
            return setError("All fields are required")
        }

        // update condition
        if (props.isEditForm) {
            const data: IEmployee = {
                id: userIdToEdit.current,
                firstname: inputs.firstname,
                lastname: inputs.lastname,
                email: inputs.email,
                country: inputs.country,
            }
            updateEmployee(data)
            setInputs({ id: 0, firstname: "", lastname: "", email: "", country: "" })
            if(isSuccess){
               navigate(`/?highlight=${userIdToEdit.current}`)
            }
            return
        }

        //add section
        const data: IEmployee = {
            id: userIdToEdit.current,
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            email: inputs.email,
            country: inputs.country,
        }
        addEmployee(data)
        setInputs({ id: 0, firstname: "", lastname: "", email: "", country: "" })
    };


    const handleError = () => {
        setError("")
    }



    return (
        <div className="w-full  flex  justify-center min-h-full">
            <div className="relative w-full max-w-[30rem] h-[max-content] mt-[1rem] ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full h-full z-[100] sm:border-[.3rem] px-[2rem] py-[1rem] pt-[2rem]  border-neutral-600 rounded-md"
                >

                    <div onClick={handleError} className="bg-neutral-700 group relative p-1 focus-within:border-white border-2 border-transparent transition duration-300  h-[3.5rem] mb-[1rem] overflow-hidden rounded-sm">
                        <label htmlFor='firstname' className="block absolute -top-[.09rem] left-2 text-[.76rem] text-neutral-300 group-hover:text-[.5rem] duration-300" >
                            Firstname
                        </label>
                        <input
                            value={inputs.firstname}
                            onChange={getInputValues}
                            className="w-full outline-none h-full px-1 bg-neutral-700 text-white "
                            name="firstname"
                            type="text"
                        />
                    </div>
                    <div onClick={handleError} className="bg-neutral-700 relative group p-1 h-[3.5rem] mb-[1rem] focus-within:border-white border-2 border-transparent transition duration-300 overflow-hidden rounded-sm">
                        <label htmlFor='lastname' className="block absolute -top-[.09rem] text-[.76rem] left-2 text-neutral-300 group-hover:text-[.5rem] duration-300" >
                            Lastname
                        </label>
                        <input
                            value={inputs.lastname}
                            onChange={getInputValues}
                            className="w-full outline-none h-full  px-2 bg-neutral-700 text-white "
                            name="lastname"
                            type="text"
                        />
                    </div>
                    <div onClick={handleError} className="bg-neutral-700 relative group p-1 h-[3.5rem] mb-[1rem] focus-within:border-white border-2 border-transparent transition duration-300 overflow-hidden rounded-sm">
                        <label htmlFor='email' className="block absolute -top-[.09rem]  text-[.76rem] left-2 text-neutral-300 group-hover:text-[.5rem] duration-300" >
                            Email
                        </label>
                        <input
                            value={inputs.email}
                            onChange={getInputValues}
                            className="w-full outline-none h-full px-2 bg-neutral-700 text-white "
                            name="email"
                            type="email"
                        />
                    </div>
                    <div onClick={handleError} className="bg-neutral-700 relative group p-1 h-[3.5rem] focus-within:border-white border-2 border-transparent transition duration-300 overflow-hidden rounded-sm">
                        <label htmlFor='country' className="block absolute -top-[.09rem] left-2 text-[.76rem] text-neutral-300 group-hover:text-[.5rem] duration-300" >
                            Country
                        </label>
                        <input
                            value={inputs.country}
                            onChange={getInputValues}
                            className="w-full outline-none  px-2 h-full bg-neutral-700 text-white "
                            name="country"
                            type="text"
                        />
                    </div>
                    <div className={`w-full flex items-center justify-center mt-[1rem]`}>
                        <button
                            type="submit"
                            className={`${isUpdating || isAdding
                                    ? "bg-neutral-700"
                                    : "bg-yellow-500 hover:bg-yellow-700"
                                } text-black py-2 rounded-md px-1 w-[5rem]`}
                            disabled={isUpdating || isAdding}
                        >
                            {props.isEditForm ? "Update" : "Add"}
                        </button>

                    </div>

                    <div className="h-[1.7rem] mt-[.4rem] text-[.8rem] rounded-r-full w-full flex items-center justify-center text-white">
                        {error && error}
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Form;
