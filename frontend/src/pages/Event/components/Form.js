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

    const statusdata = ["Completed", "Ongoing", "Not Started"]

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.eventname.value = onEdit.eventname;
            user.eventplace.value = onEdit.eventplace;
            user.eventdate.value = onEdit.eventdate;
            user.eventstatus.value = onEdit.eventstatus;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
            !user.eventname.value ||
            !user.eventplace.value ||
            !user.eventdate.value ||
            !user.eventstatus.value
        ) {
            return toast.warn("All fields are requied!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    eventname: user.eventname.value,
                    eventplace: user.eventplace.value,
                    eventdate: user.eventdate.value,
                    eventstatus: user.eventstatus.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    eventname: user.eventname.value,
                    eventplace: user.eventplace.value,
                    eventdate: user.eventdate.value,
                    eventstatus: user.eventstatus.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.eventname.value = "";
        user.eventplace.value = "";
        user.eventdate.value = "";
        user.eventstatus.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer className="flex gap-4" ref={ref} onSubmit={handleSubmit}>
            <InputArea className="image lg:grid-cols-2 w-3/6 gap-4">
                <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Event Image</Label>
                <img src="" alt="Event Letter" className="border w-full px-5 py-3 focus:outline-none rounded-md" style={{ textAlign: "center", margin: "auto" }} />
                <Input className="w-full px-5 py-3 focus:outline-none rounded-md" type="file"/>
            </InputArea>
            <div className="data grid lg:grid-cols-1 w-4/6 gap-4">
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Event Name</Label>
                    <Input name="eventname" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Event place</Label>
                    <Input name="eventplace" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Event date</Label>
                    <Input name="eventdate" type="date" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Event status</Label>
                    <Input list="data" name="eventstatus" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Choose" />
                    <datalist id="data">
                        {statusdata.map((op) => <option>{op}</option>)}
                    </datalist>
                </InputArea>
                <br />
                <Button type="submit" className="w-4/6 flex justify-center text-lg w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Submit</Button>
            </div>
        </FormContainer>
    );
};

export default Form;
