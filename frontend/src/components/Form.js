import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.eventname.value = onEdit.eventname;
      user.eventplace.value = onEdit.eventplace;
      user.eventstatus.value = onEdit.eventstatus;
      user.eventdate.value = onEdit.eventdate;
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
      return toast.warn("Preencha todos os campos!");
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
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Event Name</Label>
        <Input name="eventname" />
      </InputArea>
      <InputArea>
        <Label>Event Place</Label>
        <Input name="eventplace"/>
      </InputArea>
      <InputArea>
        <Label>Event Date</Label>
        <Input name="eventdate" type="date" />
      </InputArea>
      <InputArea>
        <Label>Event Status</Label>
        <Input name="eventstatus" />
      </InputArea>

      <Button type="submit">Add</Button>
    </FormContainer>
  );
};

export default Form;
