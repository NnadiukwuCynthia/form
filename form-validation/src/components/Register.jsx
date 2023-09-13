import {useState, useRef, useEffect} from 'react';
import {FaCheck, FaInfoCircle, FaTimes} from 'react-icons/fa'


const USER_REGEX= /^[a-zA-z][a-zA-z0-9-_]{4,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();
    
    const [userName, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(()=>{
        const result = USER_REGEX.test(userName);
        console.log(result);
        console.log(userName);
        setValidName(result);
    }, [userName])

    useEffect(()=>{ 
        const result = PWD_REGEX.test(password)
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [userName, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validate1 = USER_REGEX.test(userName)
        const validate2 = PWD_REGEX.test(password);
        if (!validate1 || !validate2) {
            setErrMsg('Invalid Entry');
            return;
        }
        console.log(userName, password);
        setSuccessMsg(true);
    }
  return (
    <>
    {successMsg ? (
        <section>
            <h1>Success!!!</h1>
            <p>
                <a href="/login">Sign In</a>
            </p>
        </section>
    ) : (
        <section>
    <p ref={errorRef} className={errMsg ? 'errmsg' : "offscreen"} aria-live='assertive'>{errMsg}</p>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:
        <span  className={validName ? "valid" : "hide"}> <FaCheck/>
        </span>
        <span className={validName || !userName ? "hide" : "invalid"}>
            <FaTimes/>
            </span>
        </label>
        <input 
        type="text"
        id='username' 
        ref={userRef}
        autoComplete='off'
        onChange={(e) => setUserName(e.target.value)}
        required
        aria-invalid={validName ? 'false' : 'true'}
        aria-describedby='uidnote'
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        />
        <p id='uidnote' className= {userFocus && userName && !validName ? "instructions" : "offscreen"}>
            <FaInfoCircle/>
            Username must be between 5 to 24 characters <br />
            Must begin with a letter. <br />
            Letters, numbers, underscores and hyphens are allowed.
        </p>

        <label htmlFor="password">
            Password:
            <span className={validPassword ? 'valid' : 'hide'}>
                <FaCheck/>
            </span>
            <span className={validPassword || !password ? "hide" : 'invalid'}>
                <FaTimes/>
            </span>
        </label>
        <input 
        type='password'
        id='password'
        onChange={e => setPassword(e.target.value)}
        required
        aria-invalid={validPassword ? 'false' : 'true'}
        aria-describedby='pwdnote'
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
        />
        <p id='pwdnote' className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
            <FaInfoCircle/>
            Password must be between 8 to 24 characters <br />
            Must contain at least one lowercase letter <br />
            Must contain at least one uppercase letter <br />
            Must contain at least one number <br />
            Must contain at least one special character
        </p>

        <label htmlFor="confirm_password">
           Confirm Password:
            <span className={validMatch && matchPassword ? 'valid' : 'hide'}>
                <FaCheck/>
            </span>
            <span className={validMatch || !matchPassword ? "hide" : 'invalid'}>
                <FaTimes/>
            </span>
        </label>
        <input 
        type='password'
        id='confirm_password'
        onChange={e => setMatchPassword(e.target.value)}
        required
        aria-invalid = {validMatch ? 'false' : 'true'}
        aria-describedby='confirmnote'
         onFocus={() => setMatchFocus(true)}
         onBlur={() => setMatchFocus(false)}
        />
        <p id='confirmnote' className={matchFocus && !validMatch? 'instructions' : 'offscreen'}>
            <FaInfoCircle/>
            Passwords must match
        </p>
        < button disabled={!validName || !validPassword || !validMatch ? true : false}> Sign Up </button>
    </form>
    <p>
        Already have an account? <br />
        <span className='line'>
        <a href='/login'>Sign In</a>
        </span>
    </p>
    </section>
    )
    }
    
    </>
  )
}

export default Register;