'use client'
import React, { useEffect, useState } from 'react'
import { maincontainer, mainheader, mainheadertext } from './animations/main'
import { motion } from 'motion/react'
import css from './css/main.style.module.css'
import PostBlock from './postblock'
import { sampleData } from './data/sampledata'
import GETPosts from '../api/GETPosts'

function MainPage() {
    const [posts, setPosts] = useState<any>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const { newData, error } = await GETPosts('tech')
            if (error) console.error(error)
            else setPosts(newData ?? [])
        }
        fetchPosts()
    }, [])
    const Postblocks = posts.map((post: {
        user_id: string
        uploaderPfpPath: string
        caption: string
        likes: number
        comments: {
            user_id: string
            pfpPath: string
            comment: string
        }[]
        filePath: string
    }, index: number) => (
        <PostBlock key={index}
            user_id={post.user_id}
            uploaderPfpPath={post.uploaderPfpPath}
            caption={post.caption}
            likes={post.likes}
            comments={post.comments}
            filePath={post.filePath} />
    ))
    return (
        <motion.div variants={maincontainer} initial='entry' animate='animate' exit='exit' className={css.container}>
            <motion.div variants={mainheader} initial='enter' animate='animate' className={css.header}>
                <motion.h1 variants={mainheadertext} initial='entry' animate='animate'><span>K</span>ICKSTARTER</motion.h1>
            </motion.div>
            {Postblocks}
        </motion.div>
    )
}

export default MainPage
