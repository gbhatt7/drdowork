import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 2%;
`;

const InputArea = styled.div``;

const Input = styled.input``;

const Label = styled.label``;

const Button = styled.button``;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.employeename.value = onEdit.employeename;
            user.employeeemail.value = onEdit.employeeemail;
            user.employeedob.value = onEdit.employeedob;
            user.employeephoneno.value = onEdit.employeephoneno;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
            !user.employeename.value ||
            !user.employeeemail.value ||
            !user.employeedob.value ||
            !user.employeephoneno.value
        ) {
            return toast.warn("All fields are requied!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/employee/" + onEdit.id, {
                    employeename: user.employeename.value,
                    employeeemail: user.employeeemail.value,
                    employeedob: user.employeedob.value,
                    employeephoneno: user.employeephoneno.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/employee", {
                    employeename: user.employeename.value,
                    employeeemail: user.employeeemail.value,
                    employeedob: user.employeedob.value,
                    employeephoneno: user.employeephoneno.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.employeename.value = "";
        user.employeeemail.value = "";
        user.employeedob.value = "";
        user.employeephoneno.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer className="flex gap-4" ref={ref} onSubmit={handleSubmit}>
            <div className="image lg:grid-cols-2 w-3/6 gap-4">
                <img src="" alt="EmployeeImage" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="data grid lg:grid-cols-1 w-4/6 gap-4">
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Employee Name</Label>
                    <Input name="employeename" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Employee Email</Label>
                    <Input name="employeeemail" type="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Employee D.O.B</Label>
                    <Input name="employeedob" type="date" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Employee Phone Number</Label>
                    <Input name="employeephoneno" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </InputArea>
                <br />
                <Button type="submit" className="w-4/6 flex justify-center text-lg w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Submit</Button>
            </div>
        </FormContainer>
    );
};

export default Form;
