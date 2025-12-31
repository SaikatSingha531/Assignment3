
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Route from './Routing/Router'
import { Toaster } from 'sonner'
// import AddEdit from './Pages/AddEdit'
// import Stopwatch from './Components/Stopwatch'

function App() {

  return (
    <>
    {/* <Stopwatch/> */}
    {/* <AddEdit/> */}
    <Toaster position='top-right' richColors/>
    <RouterProvider router={Route}/>
    </>
  )
}

export default App
