import React, { useContext, useState } from 'react'
import {Modal, Button, CloseButton} from 'react-bootstrap'
import { LanguageContext } from '../context/countries/LanguageState'
import { LogInContext } from '../context/countries/LogInState'

const SignIn = props => {
    
    const {showSignIn, setShowSignIn} = useContext(LogInContext)
    const {lang} = useContext(LanguageContext)

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [photo, setPhoto] = useState(null)
    const [warning, setWarning] = useState('hidden')

    const handleSignIn = async () => {
        if(!login.trim() || !pass.trim()) {setWarning('visible') ;return}

        let user = {
            login:login,
            pass: pass,
            photoPath: ''
        }

        if(photo){
            const data = new FormData()
            data.append('file', photo)
            data.append('upload_preset', 'qlotaoog')

            const response = await fetch('https://api.cloudinary.com/v1_1/dvbkndvl0/image/upload', {
                method: 'POST',
                body: data,            
            })
            const responseJson = await response.json()
            user.photoPath = responseJson.url
        }
         
        const res = await fetch('/api/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })

        const resJson = await res.text()
        setShowSignIn(false)
        console.log(resJson)
    }
    
    const clear = () => {
        setLogin('')
        setPass('')
        setPhoto(null)
        setWarning('hidden')
    }

    const localization = {
        en:{
            title: 'Authorization',
            login:'Sign Up',
            cancel:'Cancel',
            warning: 'Invalid login or password',
            photo: 'Photo',
            loginPl: 'Login',
            passPl: 'Password'
        },
        ru:{
            title: 'Авторизация',
            login:'Регистрация',
            cancel:'Отмена',
            warning: 'Неверный логин или пароль',
            photo: 'Фото',
            loginPl: 'Логин',
            passPl: 'Пароль'
        },
        uk:{
            title: 'Авторизація',
            login:'Регістрація',
            cancel:'Відміна',
            warning: 'Невірний логін або пароль',
            photo: 'Фото',
            loginPl: 'Логін',
            passPl: 'Пароль'
        }   
    }

    return(
        <Modal
            show={showSignIn}
            backdrop="static"
            onHide={()=>setShowSignIn(false)}
            keyboard={false}
            centered
        >
            <Modal.Header >
                <Modal.Title>{localization[lang].title}</Modal.Title>
                <CloseButton onClick={()=>{setShowSignIn(false); clear()}}/>
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
                    <label className="form-label" for="photo" style={{marginRight:'10px'}}>{localization[lang].photo}:</label>
                    <input type="file" id="photo" onChange={e=>setPhoto(e.target.files[0])}/>
  
                    <p 
                        style={{visibility:warning, margin:0, color:'red'}}
                    >{localization[lang].warning}</p>

                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowSignIn(false);clear()}}>{localization[lang].cancel}</Button>
                <Button variant="primary" onClick={handleSignIn}>{localization[lang].login}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignIn