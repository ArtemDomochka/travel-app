import React, { useContext, useState } from 'react'
import {Modal, Button, CloseButton} from 'react-bootstrap'
import { LogInContext } from '../context/countries/LogInState'

const LogIn = props => {
    
    const {showLogIn, setShowLogIn, setUserInfo, setIsLogedIn} = useContext(LogInContext)

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

    return(
        <Modal
            show={showLogIn}
            backdrop="static"
            onHide={()=>setShowLogIn(false)}
            centered
        >
            <Modal.Header >
                <Modal.Title>Authorization</Modal.Title>
                <CloseButton onClick={()=>{setShowLogIn(false); clear()}}/>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={e=>e.preventDefault()}> 
                    <input type="text" className="form-control" placeholder="Login"
                        style={{marginBottom:'10px'}} required
                        value={login}
                        onChange={e=>setLogin(e.target.value)}
                    />
                    <input type="text" className="form-control" placeholder="Password"
                        style={{marginBottom:'10px'}} required
                        value={pass}
                        onChange={e=>setPass(e.target.value)}
                    />
                    
                    <p 
                        style={{visibility:warning, margin:0, color:'red'}}
                    >Invalid login or password</p>

                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowLogIn(false);clear()}}>Cancel</Button>
                <Button variant="primary" onClick={handleLogIn}>Sign In</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogIn