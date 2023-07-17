import styled from "styled-components";
import Grid from "./components/Grid";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div``;

function Event() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [query, setQuery] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <input type="text" className='form-control border my-4 w-2/5 px-5 py-3 focus:outline-none rounded-md font-bold' placeholder='Search..'
          onChange={(e)=> setQuery(e.target.value)} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default Event;
