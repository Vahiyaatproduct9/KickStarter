'use client'
import React from 'react'
import { maincontainer, mainheader, mainheadertext } from './animations/main'
import { motion } from 'motion/react'
import css from './css/main.style.module.css'
import PostBlock from './postblock'
import { sampleData } from './data/sampledata'

function MainPage() {
    const Postblocks = sampleData.map((post, index) => (
        <PostBlock key={index} {...post} />
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
