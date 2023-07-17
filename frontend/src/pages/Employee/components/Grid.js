import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };
    
    const [query, setQuery] = useState('');

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/employee/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <div className='m-5'>
            <input type="text" className='border w-2/5 px-5 py-3 focus:outline-none rounded-md font-bold' placeholder='Search..'
                onChange={(e) => {
                    setQuery(e.target.value)
                }} />
            <table className="min-w-full table-auto my-5">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Employee ID</span>
                        </th>
                        <th className="px-10 py-2">
                            <span className="text-gray-200">Name</span>
                        </th>
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Email</span>
                        </th>
                        <th className="px-12 py-2">
                            <span className="text-gray-200">D.O.B</span>
                        </th>
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Phone Number</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-200">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {users && users.map((item, i) => (
                        <tr className="bg-gray-50 text-center" key={i}>
                            <td className="px-12 py-2"><span>{item.id}</span></td>
                            <td className="px-10 py-2"><span>{item.employeename || "Unknown"}</span></td>
                            <td className="px-12 py-2"><span>{item.employeeemail || "Unknown"}</span></td>
                            <td className="px-12 py-2"><span>{item.employeedob || "Unknown"}</span></td>
                            <td className="px-12 py-2"><span>{item.employeephoneno || "Unknown"}</span></td>
                            <td className="px-16 py-2 flex justify-around gap-5">
                                <button className="cursor"><FaEdit onClick={() => handleEdit(item)} size={25} color={"rgb(34,197,94)"} /></button>
                                <button className="cursor"><FaTrash onClick={() => handleDelete(item.id)} size={25} color={"rgb(244,63,94)"} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Grid
