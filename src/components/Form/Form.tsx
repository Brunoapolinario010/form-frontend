import './Form.css'

import { useForm } from "react-hook-form";
import axios from "axios";
import { IUserRegister, IUser } from "./DTOS";

interface IRegisterFormProps {
  required?: boolean;
  user?: IUser;
}

const Form = ({ required = true, user }: IRegisterFormProps) => {
  const { register, handleSubmit } = useForm();

  const createUser = async function(data: IUserRegister) {
    try {
      await axios.post('http://localhost:3200/users', {...data});
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response) {
          console.error(error.response.data);
        }
      }
      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  const updateUser = async function(data: IUser) {
    try {
      if(!user) throw new Error('User is not defined');
      await axios.put(`http://localhost:3200/users/${user.id}`, {...data});
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response) {
          console.error(error.response.data);
        }
      }
      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <>
      <h1>{user ? `Update user` : 'Register'}</h1>
      <form onSubmit={handleSubmit(data => {
        if(user) updateUser(data as IUser)
        else createUser(data as IUserRegister)
        })}>
        <div className="input-container">
          <label htmlFor="username">Username<span className='required'>*</span></label>
          <input {...register("username")} type="text" name="username" id="username" placeholder="Username" autoComplete="username" defaultValue={user?.username ?? ''} required={required} />
        </div>

        {user ? null : (
          <div className="input-container">
            <label htmlFor="password">Password<span className="required">*</span></label>
            <input {...register("password")} type="password" name="password" id="password" placeholder='Password' autoComplete="password" required={required} />
          </div>
        )}

        {user ? null : (
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm password<span className="required">*</span></label>
            <input {...register("confirmPassword")} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" autoComplete="confirmPassword" required={required} />
          </div>
        )}

        <div className="input-container">
          <label htmlFor="email">E-mail<span className='required'>*</span></label>
          <input {...register("email")} type="email" name="email" id="email" placeholder="E-mail" autoComplete="email" defaultValue={user?.email ?? ''} required={required} />
        </div>

        <div className="input-container">
          <label>Gênero<span className='required'>*</span></label>
          <div className="gender">
            <input {...register("gender")} type="radio" name="gender" value={"masculino"} id="masculino" defaultChecked={user?.gender == 'masculino' ? true : false} required={required} />
            <label htmlFor="masculino">Masculino</label>
            <input {...register("gender")} type="radio" name="gender" value={"feminino"} id="feminino" defaultChecked={user?.gender == 'feminino' ? true : false} required={required} />
            <label htmlFor="feminino">Feminino</label>
            <input {...register("gender")} type="radio" name="gender" value={"outro"} id="outro" defaultChecked={user?.gender == 'outro' ? true : false} required={required} />
            <label htmlFor="outro">Prefiro não dizer</label>
          </div>
        </div>

        {user ? null : (
          <div className="input-container">
            <div className="terms">
              <input {...register("terms")} type="checkbox" name="terms" id="terms" required={required} />
              <label htmlFor="terms">Eu concordo com os <a href="_blank">termos e condições</a></label>
            </div>
          </div>
        )}
        
        <button type="submit">{user ? 'Update' : 'Register'}</button>
      </form>
    </>
  );
}

export default Form;