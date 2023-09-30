import { IUser } from '../Form/DTOS';
import Form from '../Form/Form';
import './Modal.css';

interface IModalProps {
  user: IUser;
  closeModal: () => void;
}

const Modal = ({ user, closeModal }: IModalProps) => {
  return (
    <div className="modal-container" onClick={e => {
        if(e.target === e.currentTarget) closeModal();
      }}>
      <div className="modal-content">
        <Form required={false} user={user}/>
      </div>
    </div>
  );
}

export default Modal;