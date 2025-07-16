'use client'
import React from 'react'
import { useState } from 'react'
import css from './categories.style.module.css'

interface CategoriesProps {
    setActiveCategory: (category: string) => void;
    setContentLoading: (contentLoading: boolean) => void
}

function Categories({ setActiveCategory, setContentLoading }: CategoriesProps) {
    const [shownActiveCategory, setShownActiveCategory] = useState('tech')
    function setStatus(e: string) {
        setActiveCategory(e)
        setShownActiveCategory(e)
        setContentLoading(true)
    }
    return (
        <div className={css.container}>
            <button id='tech' onClick={() => setStatus('tech')}
                style={shownActiveCategory === 'tech' ? { color: 'orange' } : {}}
                className={css.categoryContainer}>
                Tech
            </button>
            <button id='cosmetics' onClick={() => setStatus('cosmetics')}
                style={shownActiveCategory === 'cosmetics' ? { color: 'orange' } : {}} className={css.categoryContainer}>
                Cosmetics
            </button>
            <button id='design' onClick={() => setStatus('design')}
                style={shownActiveCategory === 'design' ? { color: 'orange' } : {}} className={css.categoryContainer}>
                Design
            </button>
            <button id='fashion' onClick={() => setStatus('fashion')}
                style={shownActiveCategory === 'fashion' ? { color: 'orange' } : {}} className={css.categoryContainer}>
                Fashion
            </button>
            <button id='art' onClick={() => setStatus('art')}
                style={shownActiveCategory === 'art' ? { color: 'orange' } : {}} className={css.categoryContainer}>
                Art
            </button>
            <button id='chemistry' onClick={() => setStatus('chemistry')}
                style={shownActiveCategory === 'chemistry' ? { color: 'orange' } : {}} className={css.categoryContainer}>
                Chemistry
            </button>
            <button id='diy' onClick={() => setStatus('diy')}
                style={shownActiveCategory === 'diy' ? { color: 'orange' } : {}} className={css.categoryContainer}>
                DIY
            </button>
        </div>
    )
}

export default Categories
