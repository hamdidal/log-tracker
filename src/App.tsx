import './App.css'
import Login from './page/Login'
import './firebase'
import { Route, Routes } from 'react-router-dom'
import Register from './page/Register'
import ProjectPage from './page/ProjectPage'
import { Home } from './page/Home'
import { GlobalContextProvider } from './context'
import { DiaryBox } from './component/Diarybox'
import Auth from './component/Auth/auth'
import { UpdateDiary } from './component/Diarybox/UpdateDiary'

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth>
                <Login />
              </Auth>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adddiary" element={<DiaryBox />} />
          <Route path="/updatediary/:id" element={<UpdateDiary />} />
        </Routes>
      </GlobalContextProvider>
    </div>
  )
}
export default App
