import React from 'react'
import css from './empty.style.module.css'
function EmptyContainer() {
    return (
        <div className={css.EmptyContainer}>
            <span>No KickStarts on This Thread.</span>
            <span>Wanna Change That? :{')'}</span>
        </div>
    )
}

export default EmptyContainer
