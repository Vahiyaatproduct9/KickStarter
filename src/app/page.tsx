'use client'
import { useEffect, useState } from "react"
import LoadingState from "./loadingstate"
import MainPage from "./main"
import { AnimatePresence } from "motion/react"
export default function Home() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 500)
  }, [])
  return (
    <AnimatePresence>
      {loading ? <LoadingState key='loading' />
        : <MainPage key='main' />}
    </AnimatePresence>
  )
}
