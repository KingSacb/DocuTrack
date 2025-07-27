import axios from "axios"
import { useState, useEffect } from "react"

function App() {
  const [array, setArray] = useState([])

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080")
    setArray(response.data.blogPost)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10">
      <h1 className="text-5xl font-bold text-gray-800">Prueba de funcionamiento de Tailwindcss</h1>

    <ul className="rounded-2xl shadow-lg p-5 bg-white space-y-3">
    {
      array.map((blog,index) => (
        <li key={index} className="bg-sky-100 p-4 rounded-2xl transition-transform transform hover:scale-105">
          <p className="text-xl font-semibold text-gray-800">{blog.title}</p>
          <p className="text-sm text-gray-600">{blog.content}</p>
        </li>
      ))
    }
    </ul>
    </div>
  )
}

export default App
