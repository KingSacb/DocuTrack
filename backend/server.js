import express from "express"
import cors from "cors"
const app = express()

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.json({
        blogPost:[
            {
                title: "Este es una prueba",
                content:"El objetivo de esta prueba es comprobar que esta llegando informacion del backend al frontend."
            },
            {
                title: "Funciona el backend",
                content:"La conexion con del Backend y el Frontend funciona correctamente."
            }
        ]
    })
})

app.listen(8080, () => {
    console.log("El servidor arranca en el puerto 8080")
})