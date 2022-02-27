import React, { useCallback, useState , useEffect} from 'react';
import { auth, db } from '../firebase';
import {useNavigate} from 'react-router-dom'


export const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [isNotRegister, setIsNotRegister] = useState(true);

    const singIn = async (e) => {
        e.preventDefault();
        if(!email.trim()){
            setError('Please write an email');
            return;
        }
        if(!pass.trim()){
            setError('Please write an password');
            return;
        }
        if(pass.length < 6){
            setError('Pass must be 6 characters');
            return;
        }
        if(!isNotRegister){
            register();
        } else login();
    }

    const login = useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass);
            console.log('res', res)
            setEmail('');
            setPass('');
            setError(null);
            navigate("/admin")
        } catch (consoleError) {
            if(consoleError.code === 'auth/user-not-found'){
                setError(consoleError.message);
            }
            if(consoleError.code === 'auth/user-not-found'){
                setError(consoleError.message);
            }
            if(consoleError.code === 'auth/invalid-email'){
                setError(consoleError.message);
            }
        }

   
    }, [email, pass])

    const register = useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email,pass)
            await db.collection('users').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('');
            setPass('');
            setError(null);
            navigate("/admin")

        } catch (consoleError) {
            if(consoleError.code === 'auth/email-already-in-use'){
                setError(consoleError.message);
            }
            if(consoleError.code === 'auth/invalid-email'){
                setError(consoleError.message);
            }
            console.log('consoleError', consoleError);
        }
    }, [email, pass]);

  return (
    <section className="vh-100" style={{
        /* fallback for old browsers */
        background: "#6a11cb;",
        /* Chrome 10-25, Safari 5.1-6 */
        background: "-webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))",
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background: "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))"
      }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">
                        {
                            isNotRegister ? 'Login' : 'Register'
                        }
                    </h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                    <form onSubmit={singIn}>
                        {
                            error && (
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            )
                        }
                        <div className="form-outline form-white mb-4">
                            <input  
                                type="email" placeholder='Email' 
                                className='form-control mb-2'
                                onChange={e => setEmail(e.target.value)}
                                value={email} 
                            />
                        </div>
                        <div className="form-outline form-white mb-4">
                            <input  
                                type="password" placeholder='Password' 
                                className='form-control mb-2'
                                onChange={e => setPass(e.target.value)}
                                value={pass} 
                            />
                        </div>

                    <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                            {isNotRegister ? 'Forgot password?' : ""}
                        </a>
                    </p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        {
                            isNotRegister ? 'Login' : 'Register'
                        }
                    </button>
                    </form>                
                    </div>
                    <div>
                        <p className="mb-0"> {isNotRegister ? 'Don`t have an account? ': 'Are you register? '} 
                            <a href="#!" className="text-white-50 fw-bold" onClick={() => setIsNotRegister(!isNotRegister)}>
                                {isNotRegister ? 'Sign Up': 'Sing In'}
                            </a>
                        </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
  )
}

export default Login