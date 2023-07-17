import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
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
            <table className="min-w-full table-auto my-5">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Event ID</span>
                        </th>
                        <th className="px-10 py-2">
                            <span className="text-gray-200">Name</span>
                        </th>
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Place</span>
                        </th>
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Date</span>
                        </th>
                        <th className="px-12 py-2">
                            <span className="text-gray-200">Status</span>
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
                            <td className="px-10 py-2"><span>{item.eventname || "Unknown"}</span></td>
                            <td className="px-12 py-2"><span>{item.eventplace || "Unknown"}</span></td>
                            <td className="px-12 py-2"><span>{item.eventdate || "Unknown"}</span></td>
                            <td className="px-12 py-2">
                                <button className="cursor"><span className={`${item.eventstatus === "Completed" ? 'bg-green-500' : item.eventstatus === "Ongoing" ? 'bg-yellow-500' : 'bg-red-500'} text-white px-5 py-1 rounded-full`}>{item.eventstatus || "Unknown"}</span></button>
                            </td>
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
