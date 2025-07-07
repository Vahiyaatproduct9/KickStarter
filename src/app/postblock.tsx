'use client'
import React, { useState } from 'react'
import css from './css/postblock.style.module.css'

interface CommentInputProps {
    comment: string
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CommentInput: React.FC<CommentInputProps> = ({ comment, handleCommentChange }) => {
    return (
        <form>
            <input
                className={css.inputcomment}
                name="comment"
                value={comment}
                type="text"
                onChange={handleCommentChange}
                placeholder="Whoaaa!"
            />
            {comment === '' ? null : (
                <button className={css.actionComment}>↓</button>
            )}
        </form>
    )
}

interface Comment {
    userpfp: string
    username: string
    comment: string
}

interface CommentSectionProps {
    comments: Comment[]
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
    return (
        <div className={css.commentSection}>
            {comments.map((comment, index) => (
                <div key={index} className={css.IndividualComment}>
                    <div className={css.IndividualCommentHeader}>
                        <div className={css.commentorpfp}>
                            <img src={comment.userpfp} />
                        </div>
                        <div className={css.Commentorname}>
                            <span>{comment.username}</span>
                        </div>
                    </div>
                    <div className={css.commentBody}>
                        <span>{comment.comment}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PostBlock(props: {
    user_id: string
    uploaderPfpPath: string
    filePath: string
    caption: string
    likes: number
    comments: {
        user_id: string
        pfpPath: string
        comment: string
    }[]
}) {
    const [comment, setComment] = useState('')
    const [showComments, setShowComments] = useState(false)

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }

    return (
        <div className={css.container}>
            {/* This is the Head part of the post */}
            <div className={css.postHead}>
                <div className={css.userpfp}>
                    <img src={props.uploaderPfpPath} />
                </div>
                <div className={css.username}>
                    <span>{props.user_id}</span>
                </div>
            </div>

            {/* This is the body of the post */}
            <div className={css.postContent}>
                <div className={css.postContentPicture}>
                    <img src={props.filePath} />
                </div>
                <div className={css.postContentCaption}>
                    <p>{props.caption}</p>
                </div>
            </div>

            {/* Options: like + comment toggle */}
            <div className={css.options}>
                <div className={css.postlike}>
                    <button>&hearts;</button>
                    {showComments ? null : <span>{props.likes}</span>}
                </div>
                {showComments && (
                    <CommentInput
                        comment={comment}
                        handleCommentChange={handleCommentChange}
                    />
                )}

                <button
                    className={css.postcomment}
                    onClick={() => setShowComments(!showComments)}
                >
                    {showComments ? '✕' : '🗣️'}
                </button>
            </div>

            {showComments && (
                <CommentSection
                    comments={props.comments.map(c => ({
                        userpfp: c.pfpPath,
                        username: c.user_id,
                        comment: c.comment,
                    }))}
                />
            )}
        </div>
    )
}

export default PostBlock
