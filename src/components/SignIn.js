import React, { useContext, useState } from 'react'
import {Modal, Button, CloseButton} from 'react-bootstrap'
import { LogInContext } from '../context/countries/LogInState'

const SignIn = props => {
    
    const {showSignIn, setShowSignIn} = useContext(LogInContext)

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [photo, setPhoto] = useState(null)

    const handleSignIn = async () => {
        if(!login.trim() || !pass.trim()) return

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
    }

    return(
        <Modal
            show={showSignIn}
            backdrop="static"
            onHide={()=>setShowSignIn(false)}
            centered
        >
            <Modal.Header >
                <Modal.Title>Authorization</Modal.Title>
                <CloseButton onClick={()=>{setShowSignIn(false); clear()}}/>
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
                    <label className="form-label" for="photo" style={{marginRight:'10px'}}>Photo:</label>
                    <input type="file" id="photo" onChange={e=>setPhoto(e.target.files[0])}/>
  
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowSignIn(false);clear()}}>Cancel</Button>
                <Button variant="primary" onClick={handleSignIn}>Sign In</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignIn