import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import WeatherApp from '../Pages/Test/Test'
import Test from '../Pages/Test2/Test'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/proto-weather' element={<WeatherApp />} />
            <Route path='/test' element={<Test />} />
        </Routes>
    )
}

export default Router
