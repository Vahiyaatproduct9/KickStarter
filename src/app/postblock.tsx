'use client'
import React, { useEffect, useState } from 'react'
import css from './css/postblock.style.module.css'
import { like_unlike_post, getLikeCount, checkWhetherAlreadyLiked } from '@/api/LikePosts'
import { motion } from 'motion/react'
import { seeComment, postComment } from '../api/Comment'

interface CommentInputProps {
    post_id: string
    comment: string
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    pfpPath: string
    user: string
    setViewComments: React.Dispatch<React.SetStateAction<comments[]>>
    setComment: React.Dispatch<React.SetStateAction<string>>
}

interface comments {
    post_id: string,
    user_id: string,
    comment: string,
    pfpPath: string,
}

const CommentInput: React.FC<CommentInputProps> = ({ comment, handleCommentChange, post_id, pfpPath, user, setViewComments, setComment }) => {
    async function handleCommentPOST() {
        await postComment(post_id, comment)
    }
    return (
        <div className={css.commentForm}>
            <input
                className={css.inputcomment}
                name="comment"
                value={comment}
                type="text"
                onChange={handleCommentChange}
                placeholder="Whoaaa!"
            />
            {comment === '' ? null : (
                <button type='button' className={css.actionComment} onClick={() => {
                    handleCommentPOST();
                    setComment('');
                    setViewComments((prev) => {
                        return [...prev, {
                            post_id: post_id,
                            user_id: user,
                            comment: comment,
                            pfpPath: pfpPath
                        }]
                    })
                }}>↓</button>
            )}
        </div>
    )
}


const CommentSection: React.FC<{ comments: comments[] }> = ({ comments }) => {
    console.log(comments)
    return (
        <div className={css.commentSection}>
            {comments.map((comment: comments, index: number) => (
                <div key={index} className={css.IndividualComment}>
                    <div className={css.IndividualCommentHeader}>
                        <div className={css.commentorpfp}>
                            <img src={comment.pfpPath} />
                        </div>
                        <div className={css.Commentorname}>
                            <span>{comment.user_id}</span>
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
    post_id: string
}) {
    const [comment, setComment] = useState('')
    const [showComments, setShowComments] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState<number>(-1)
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }
    const [viewComments, setViewComments] = useState<{
        pfpPath: string
        user_id: string
        post_id: string
        comment: string
    }[]>([])

    const [hasFetchedComments, setHasFetchedComments] = useState(false)

    useEffect(() => {

        const fetchComments = async () => {
            const c = await seeComment(props.post_id)
            if (Array.isArray(c)) {
                setViewComments(c)
                setHasFetchedComments(true)
            }
        }
        fetchComments()
    }, [showComments, hasFetchedComments, props.post_id])

    useEffect(() => {
        // check whether already liked
        const checkWhetheralreadyLiked = async () => {
            const check = await checkWhetherAlreadyLiked(props.post_id)
            setLiked(check)
        }
        checkWhetheralreadyLiked()
        const likeCount = async () => {
            let count = await getLikeCount(props.post_id)
            if (count !== undefined) {
                setLikeCount(count)
            }
        }
        likeCount()
    }, [])


    useEffect(() => {
        const checkLike = async () => {
            await like_unlike_post(props.post_id, liked)
        }
        checkLike()
    }, [liked])

    // console.log('viewComments : ' + viewComments)
    // console.log('showComments : ' + showComments)
    // console.log('props.post_id : ' + props.post_id)
    // seeComment(props.post_id).then(result => console.log('seeComment : ', result))
    return (
        <div className={css.container}>
            {/* This is the Head part of the post */}
            <div className={css.postHead}>
                <div className={css.userpfp} style={{ backgroundImage: `url(${props.uploaderPfpPath})` }}>
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
                <div className={css.postlike} onClick={() => {
                    setLiked(!liked);
                    (liked) ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
                }}>
                    <motion.button animate={liked ? { color: 'red' } : {}}>&hearts;</motion.button>
                    {!showComments && <span id='likes'>{likeCount === -1 ? '..' : likeCount}</span>}

                    <button
                        className={css.postcomment}
                        onClick={() => setShowComments(!showComments)}
                    >
                        {showComments ? '✕' : '🗣️'}
                    </button>
                </div>
                {showComments && (
                    <CommentInput
                        comment={comment}
                        handleCommentChange={handleCommentChange}
                        post_id={props.post_id}
                        pfpPath={props.uploaderPfpPath}
                        user={props.user_id}
                        setViewComments={setViewComments}
                        setComment={setComment}
                    />
                )}

            </div>
            {showComments && (
                <CommentSection comments={viewComments} />
            )}
        </div>
    )
}

export default PostBlock
