import React, { useContext, useState } from 'react'
import { LogInContext } from '../context/countries/LogInState'
import  styles from './Comments.module.scss' 

const Comments = props => {

    const {isLogedIn, userInfo} = useContext(LogInContext)

    const [commentText, setCommentText] = useState('')

    const handlePostComment = async () => {
        if(commentText.trim()==='') return

        const comment = {
            country: props.country,
            user: userInfo,
            text: commentText
        }

        const res = await fetch('/api/saveComment', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(comment)
        })

        const resJson = await res.json()
        console.log(resJson);

        setCommentText('')
    }

    return(
        <div className={styles.box}>
            <div className={styles.writePart}>
                {
                    isLogedIn
                    ? <div style={{padding:'10px'}}> {/*tut bi Image i Transformation iz clouda*/}
                        <img src={userInfo.photoPath} alt="avatar" width="75px" height="75px" style={{marginRight:'10px'}}/>
                        <form className={styles.messageForm} onSubmit={e=>e.preventDefault()}>
                            <textarea
                                className={styles.writeAria}
                                onChange={e=>setCommentText(e.target.value)}
                            /> {/*kak sdelat' auto-height*/}
                            <button type="button" className="btn btn-danger" onClick={handlePostComment}>
                                Post comment
                            </button>
                        </form>
                    </div>
                    : <div>
                        <b>You should log in to leave a comment.</b>
                    </div>
                }
            </div>

        </div>
    )
}

export default Comments