import { loadingcontainer, loadingtext } from './animations/loading'
import React from 'react'
import css from './css/loading.style.module.css'
import * as motion from 'motion/react-client'

function LoadingState() {
    return (
        <motion.div variants={loadingcontainer} initial='enter' animate='animate' className={css.container}>
            <motion.h1 variants={loadingtext} initial='entry' animate='animate'>KICKSTARTER</motion.h1>
        </motion.div>
    )
}

export default LoadingState
