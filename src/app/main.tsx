'use client'
import React, { useEffect, useState } from 'react'
import { maincontainer, mainheader, mainheadertext } from './animations/main'
import { motion } from 'motion/react'
import css from './css/main.style.module.css'
import PostBlock from './postblock'
import Post from './post/post'
import GETPosts from '../api/GETPosts'
import { checkWhetherSignedIn } from '../middleware/checkAuth'
import Link from 'next/link'
import Categories from './categories/categories'
import EmptyContainer from './empty/empty'
import ContentLoadingState from './loading/loading'

interface PostType {
    id: string;
    user_id: string
    uploaderPfpPath: string
    caption: string
    likes: number
    post_id: string
    comments: {
        user_id: string
        pfpPath: string
        comment: string
    }[]
    filePath: string
}

function MainPage() {
    const [signedIn, setSignedIn] = useState(false)
    const [posts, setPosts] = useState<PostType[]>([])
    const [isPostVisible, setIsPostVisible] = useState(false)
    const [activeCategory, setActiveCategory] = useState('none')
    const [contentLoading, setContentLoading] = useState(true)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setContentLoading(true)
                const { newData, error } = await GETPosts(activeCategory === 'none' ? 'tech' : activeCategory)
                if (error) console.error(error)
                else setPosts(newData ?? [])
            }
            finally {
                setContentLoading(false)
            }
        }
        const whetherSignedIn = async () => {
            const result = await checkWhetherSignedIn()
            setSignedIn(result)
        }
        fetchPosts();
        whetherSignedIn()
    }, [activeCategory])

    return (
        <motion.div variants={maincontainer} initial='entry' animate='animate' exit='exit' className={css.container}>
            <motion.div variants={mainheader} initial='enter' animate='animate' className={css.header}>
                <motion.h1 variants={mainheadertext} initial='entry' animate='animate'><span>K</span>ICKSTARTER</motion.h1>
                {signedIn ? (
                    <button className={css.addPost} onClick={() => { setIsPostVisible(true) }}>+</button>
                ) : (<button className={css.signIn}>
                    <Link className={css.link} href={'/auth'}>Login</Link>
                </button>)}
            </motion.div>
            <Categories setActiveCategory={setActiveCategory} setContentLoading={setContentLoading} />
            {isPostVisible && <Post setIsPostVisible={setIsPostVisible} />}

            {contentLoading ? <ContentLoadingState /> : posts.length === 0 ? (
                <EmptyContainer />
            ) : (
                posts.map((post) => (
                    <PostBlock key={post.id} {...post} post_id={post.id} />
                ))
            )}

        </motion.div>
    )
}

export default MainPage
