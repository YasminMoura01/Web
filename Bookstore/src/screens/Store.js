import { useState, useEffect } from 'react';
import styles from './Store.module.css';
import { useAuthentication } from '../hooks/useAuthentication';
 
const RegisterStore = () => {
  useEffect(() => {
    document.title = " Cadastrar Loja"
  }, [])
 
const [displayName, setName]=useState('');
const [displayEndereco, setEndereco]  = useState('');
const [displayCidade, setCidade]  = useState('');
const [displayUF, setUf]  = useState('');
const [error, setError] = useState('');
const {createUser , error: authError, loading} = useAuthentication();
 
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
 
    const user = {
        displayName,
        displayEndereco,
        displayCidade,
        displayUF
    }
    const res = await createUser(user);
}
  useEffect(() =>{
    if(authError){
      setError(authError);
    }
  }, [authError]);

 
  return (
        <div>
            <h2>Cadastre sua Loja</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>
                        Nome:
                    </span>
                    <input type="text" name="displayName" required placeholder="Nome do Usuário" value={displayName} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    <span>
                        Endereço:
                    </span>
                    <input type="text" name="displayEndereco" required placeholder="Endereço" value={displayEndereco} onChange={(e) => setEndereco(e.target.value)}/>
                </label>
                <label>
                    <span>
                        Cidade:
                    </span>
                    <input type="text" name="displayCidade" required placeholder="Cidade" value={displayCidade} onChange={(e) => setCidade(e.target.value)}/>
                </label>
                <label>
                    <span>
                        UF:
                    </span>
                    <input type="text" name="displayUF" required placeholder="UF(Estado)" value={displayUF} onChange={(e) => setUf(e.target.value)}/>
                </label>
                <center>{!loading && <button className="btn">Logar</button>}</center>
                <center>{loading && <button className="btn" disabled>Aguarde...</button>}</center>
                <center>{error && <p className="error">{error}</p>}</center>
            </form>
        </div>
    )
}
 
 
 
export default RegisterStore