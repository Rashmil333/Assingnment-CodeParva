import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Test from '../Pages/Test/Test'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<Test />} />
        </Routes>
    )
}

export default Router
