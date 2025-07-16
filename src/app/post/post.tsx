'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import css from './post.style.module.css'
import POSTPosts from '@/api/POSTPosts'


function Post(props: { setIsPostVisible: (visible: boolean) => void }) {
    const [image, setImage] = useState<File | undefined>(undefined)
    const [localFilePath, setLocalFilePath] = useState('')
    const [caption, setCaption] = useState('')
    useEffect(() => {
        const uploadButton = document.getElementById('uploadButton')
        const uploadFile = document.getElementById('uploadFile')
        uploadButton?.addEventListener('click', () => {
            uploadFile?.click()
        })
        uploadFile?.addEventListener('change', () => {
            const file = (uploadFile as HTMLInputElement)?.files?.[0]
            setImage(file)
            if (file) {
                setLocalFilePath(URL.createObjectURL(file as File))
            } else {
                setLocalFilePath('')
            }
        })

    }, [])
    const openImages = () => { document.getElementById('uploadFile')?.click() }

    const fillCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCaption(e.currentTarget.value)
    }
    let category: string;
    const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = document.getElementById('postForm') as HTMLFormElement | null;
        if (form) {

            const formData = new FormData(form);
            category = formData.get('category') as string;
            if (image) {
                const result = POSTPosts([category, image ?? null, caption])

                console.log(result)
            }
        } else {
            console.error('couldn\'t')
        }
    }
    return (
        <div className={css.background} onClick={() => props.setIsPostVisible(false)}>

            <div className={css.container} onClick={(e) => e.stopPropagation()}>
                <div className={css.title}><span className={css.head}>KickStart an Idea</span>
                    <span className={css.notice}>Click anywhere to dismiss</span></div>
                <form onSubmit={submitPost} id='postForm'>
                    <div className={css.image}>
                        {image === undefined ? (
                            <div className={css.uploadDiv}>
                                <button type='button' className={css.uploadButton} id='uploadButton'>Upload</button>
                                <p>what's on your mind today?</p>
                            </div>
                        ) : (
                            localFilePath === '' ? null : (<img src={localFilePath} />)
                        )}
                        {localFilePath === '' ? null : (
                            <div className={css.changeImage}>
                                <button type='button' onClick={openImages} id='changeImage'>Change Image</button>
                            </div>
                        )}
                        <input type='file' name='file' hidden id='uploadFile' accept='image/*' />
                    </div>
                    <div className={css.bodyContainer}>
                        {image === undefined ? null : (
                            <div className={css.preview}>
                                <div className={css.previewPostBlockContainer}>
                                    {/* this is the head part */}
                                    <div className={css.postHead}>
                                        <div className={css.userpfp}>
                                            <img src='./post.jpg' />
                                        </div>
                                        <div className={css.username}>
                                            <span>user_id</span>
                                        </div>
                                    </div>

                                    {/* this is the body part */}
                                    <div className={css.postContent}>
                                        <div className={css.postContentPicture}>
                                            {localFilePath === '' ? null : <img src={localFilePath} />}
                                        </div>
                                        <div className={css.postContentCaption}>
                                            <p>{caption}</p>
                                        </div>
                                    </div>

                                    <div className={css.options}>
                                        <div className={css.postlike}>
                                            <button>&hearts;</button>
                                            <span>X</span>
                                        </div>
                                        <span className={css.postcomment}>🗣️
                                        </span>
                                    </div>

                                </div>
                            </div>)}


                        <div className={css.options}>
                            <div className={css.captions}>
                                <textarea name='caption' placeholder='caption goes here' onChange={fillCaption} />
                            </div>
                            <div className={css.category}>
                                <select name='category' id='category'>
                                    <option value='tech'>Tech</option>
                                    <option value='cosmetics'>Cosmetics</option>
                                    <option value='chemistry'>Chemistry</option>
                                    <option value='fashion'>Fashion</option>
                                    <option value='design'>Design</option>
                                    <option value='art'>Art</option>
                                    <option value='diy'>DIY</option>
                                </select>
                            </div>
                        </div>
                        <div className={css.actionPost}>
                            <button className={css.submit} onClick={() => {
                            }}>POST</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Post
