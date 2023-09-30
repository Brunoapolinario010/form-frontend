import axios from 'axios';
import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';
import { IUserDto } from './DTOs';
import './Table.css';

const Table = () => {
  const [users, setUsers] = useState<IUserDto[] | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateTable, setUpdateTable] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDto | null>(null);

  const updateUser = async function(index: number) {
    if(!users) throw new Error('Users is not defined');

    setUser(users[index]);
    setModalOpen(true);
  };

  const deleteUser = async function(id: string) {
    try {
      await axios.delete(`http://localhost:3200/users/${id}`).then(() => setUpdateTable(!updateTable));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(error.response.data);
        }
      }
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3200/users').then(response => {
      setUsers(response.data);
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(error.response.data);
        }
      }
      if (error instanceof Error) {
        console.error(error.message);
      }
    });
  }, [modalOpen, updateTable]);

  return (
    <>
      <h1>Usuários Cadastrados</h1>
      {users && users.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>E-mail</th>
            <th>Gênero</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {users ? users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td><a onClick={() => {updateUser(index)}}>Editar</a></td>
              <td><a onClick={() => deleteUser(user.id)} className='delete'>Deletar</a></td>
            </tr>
          )) : null}
        </tbody>
      </table>
      ) : null}
      {modalOpen && user ? <Modal user={user} closeModal={() => setModalOpen(false)} /> : null}
    </>
  );
};

export default Table;