import React from 'react'
import * as motion from 'motion/react-client'
import css from './contentLoadingState.style.module.css'
const loading = () => {
    return (
        <div className={css.container}>
            <motion.div className={css.box} initial={{ y: 0 }} animate={{ y: [0, 0, -10, 0] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }} />
            <motion.div className={css.box} initial={{ y: 0 }} animate={{ y: [0, 0, -10, 0] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }} />
            <motion.div className={css.box} initial={{ y: 0 }} animate={{ y: [0, 0, -10, 0] }} transition={{ duration: 1, delay: 0.6, repeat: Infinity }} />
        </div>
    )
}

export default loading
