import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Location from './pages/location/Location'


const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} >

          <Route path='location' element={<Location />} />

        </Route>
      </Routes>

    </div>
  )
}

export default App