import React, { useContext, useEffect, useState } from 'react'
import { LogInContext } from '../context/countries/LogInState'
import  styles from './Comments.module.scss' 
import avatar from '../media/smile.png'
import { LanguageContext } from '../context/countries/LanguageState'

const Comments = props => {

    const {isLogedIn, userInfo} = useContext(LogInContext)
    const {lang} = useContext(LanguageContext)

    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])

    const handlePostComment = async () => {
        if(commentText.trim()==='') return

        const comment = {
            country: props.country,
            login: userInfo.login,
            photoPath:userInfo.photoPath,
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
        fetchComments()
    }

    const fetchComments = async () => {
        const res = await fetch(`/api/loadComments/${props.country}`)
        const resJson = await res.json()
        resJson.reverse()
        setComments(resJson) //kogda nado stringify, a kogda net?
    }

    useEffect(()=>{
        fetch(`/api/loadComments/${props.country}`) // toze 4to i fetchComments, kak vstavit funkciyu
        .then(res=>res.json())
        .then(resJson=>{resJson.reverse() ;setComments(resJson)})
    },[props.country])

    const renderComments = () => {
        return comments.map((comment, index)=>{
            return(
                <div className={styles.comment} key={index}>
                    <img src={comment.photoPath || avatar} alt="avatar" width="75px" height="75px" style={{marginRight:'10px'}}/>
                    <div className={styles.commentText}>
                        <b>{comment.login}</b>
                        <br/>
                        {comment.text}
                    </div>
                </div>
            )
        })
    }

    const localization = {
        en:{
            post:'Post comment',
            shouldlogin:'You should log in to write a comment.'
        },
        ru:{
            post:'Разместить комментарий',
            shouldlogin:'Вы должны авторизоваться, чтобы написать комментарий.'
        },
        uk:{
            post:'Опублікувати коментар',
            shouldlogin:'Вам слід увійти, щоб написати коментар.'
        }
    }

    return(
        <div className={styles.box}>
            <div className={styles.writePart}>
                {
                    isLogedIn
                    ? <div style={{padding:'10px'}}> {/*tut bi Image i Transformation iz clouda*/}
                        <img src={userInfo.photoPath || avatar} alt="avatar" width="75px" height="75px" style={{marginRight:'10px'}}/>
                        <form className={styles.messageForm} onSubmit={e=>e.preventDefault()}>
                            <textarea
                                className={styles.writeAria}
                                value={commentText}
                                onChange={e=>setCommentText(e.target.value)}
                            /> {/*kak sdelat' auto-height*/}
                            <button type="button" className="btn btn-danger" onClick={handlePostComment}>
                                {localization[lang].post}
                            </button>
                        </form>
                    </div>
                    : <div style={{textAlign:'center'}}>
                        <b>{localization[lang].shouldlogin}</b>
                    </div>
                }  
            </div>

            {renderComments()}

        </div>
    )
}

export default Comments