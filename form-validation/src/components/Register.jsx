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

  return (
    <>
    <p ref={errorRef} className={errMsg ? 'errmsg' : "offscreen"} aria-live='assertive'>{errMsg}</p>
    <h1>Register</h1>
    <form>
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
    </form>
    </>
  )
}

export default Register;