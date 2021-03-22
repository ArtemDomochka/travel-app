import React, { useContext, useState } from 'react'
import {Modal, Button, CloseButton} from 'react-bootstrap'
import { LanguageContext } from '../context/countries/LanguageState'
import { LogInContext } from '../context/countries/LogInState'

const LogIn = props => {
    
    const {showLogIn, setShowLogIn, setUserInfo, setIsLogedIn} = useContext(LogInContext)
    const {lang} = useContext(LanguageContext)

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [warning, setWarning] = useState('hidden')

    const handleLogIn = async () => {
        if(!login.trim() || !pass.trim()) {setWarning('visible'); return}

        const res = await fetch('/api/getUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login:login, pass:pass})
        })

        const resJson = await res.json()

        if(resJson.status==='success'){
            setUserInfo({
                login:resJson.login,
                pass:resJson.pass,
                photoPath:resJson.photoPath,
            })
            setIsLogedIn(true)
            setShowLogIn(false)
        }else{
            setWarning('visible')
            return
        }

        clear()
    }   
    
    const clear = () => {
        setLogin('')
        setPass('')
        setWarning('hidden')
    }

    const localization = {
        en:{
            title: 'Authorization',
            login:'Sign In',
            cancel:'Cancel',
            warning: 'Invalid login or password',
            loginPl: 'Login',
            passPl: 'Password'
        },
        ru:{
            title: 'Авторизация',
            login:'Войти',
            cancel:'Отмена',
            warning: 'Неверный логин или пароль',
            loginPl: 'Логин',
            passPl: 'Пароль'
        },
        uk:{
            title: 'Авторизація',
            login:'Увійти',
            cancel:'Відміна',
            warning: 'Невірний логін або пароль',
            loginPl: 'Логін',
            passPl: 'Пароль'
        }   
    }

    return(
        <Modal
            show={showLogIn}
            backdrop="static"
            onHide={()=>setShowLogIn(false)}
            keyboard={false}
            centered
        >
            <Modal.Header >
                <Modal.Title>{localization[lang].title}</Modal.Title>
                <CloseButton onClick={()=>{setShowLogIn(false); clear()}}/>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={e=>e.preventDefault()}> 
                    <input type="text" className="form-control" placeholder={localization[lang].loginPl}
                        style={{marginBottom:'10px'}} required
                        value={login}
                        onChange={e=>setLogin(e.target.value)}
                    />
                    <input type="text" className="form-control" placeholder={localization[lang].passPl}
                        style={{marginBottom:'10px'}} required
                        value={pass}
                        onChange={e=>setPass(e.target.value)}
                    />
                    
                    <p 
                        style={{visibility:warning, margin:0, color:'red'}}
                    >{localization[lang].warning}</p>

                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowLogIn(false);clear()}}>{localization[lang].cancel}</Button>
                <Button variant="primary" onClick={handleLogIn}>{localization[lang].login}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogIn