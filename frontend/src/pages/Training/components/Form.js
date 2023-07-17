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

            user.trainingname.value = onEdit.trainingname;
            user.trainingplace.value = onEdit.trainingplace;
            user.trainingdate.value = onEdit.trainingdate;
            user.trainingstatus.value = onEdit.trainingstatus;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
            !user.trainingname.value ||
            !user.trainingplace.value ||
            !user.trainingdate.value ||
            !user.trainingstatus.value
        ) {
            return toast.warn("All fields are requied!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/training/" + onEdit.id, {
                    trainingname: user.trainingname.value,
                    trainingplace: user.trainingplace.value,
                    trainingdate: user.trainingdate.value,
                    trainingstatus: user.trainingstatus.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/training", {
                    trainingname: user.trainingname.value,
                    trainingplace: user.trainingplace.value,
                    trainingdate: user.trainingdate.value,
                    trainingstatus: user.trainingstatus.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.trainingname.value = "";
        user.trainingplace.value = "";
        user.trainingdate.value = "";
        user.trainingstatus.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer className="flex gap-4" ref={ref} onSubmit={handleSubmit}>
            <div className="image lg:grid-cols-2 w-3/6 gap-4">
                <img src="" alt="trainingImage" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="data grid lg:grid-cols-1 w-4/6 gap-4">
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Name</Label>
                    <Input name="trainingname" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Place</Label>
                    <Input name="trainingplace" className="border w-full px-5 py-3 focus:outline-none rounded-md" />
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Date</Label>
                    <Input name="trainingdate" type="date" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </InputArea>
                <InputArea className="input-type grid lg:grid-cols-2 gap-4">
                    <Label className='w-full px-5 py-3 focus:outline-none font-bold'>Status</Label>
                    <Input list="data" name="trainingstatus" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Choose" />
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
