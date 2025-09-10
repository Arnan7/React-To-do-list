import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# Carga la API key del archivo .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY no encontrada. Asegúrate de que el archivo .env esté configurado correctamente.")

# Configura la API de Gemini
genai.configure(api_key=api_key)

# Inicializa el modelo
model = genai.GenerativeModel('gemini-1.5-flash')

# Define la aplicación de FastAPI
app = FastAPI()

# --- Configuración de CORS ---
origins = [
    "http://localhost:5173",  # Agrega el origen de tu aplicación de React
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define el modelo de datos para la entrada de la API
class Tarea(BaseModel):
    nombre_tarea: str

@app.post("/clasificar_tarea/")
async def clasificar_tarea(tarea: Tarea):
    """
    Clasifica una tarea de una lista de tareas (To-Do list) usando la API de Gemini.
    """
    # El prompt base con la tarea reemplazada por la variable
    prompt_base = f"""
    Clasifica la siguiente tarea en una de las categorías provistas. Si crees que no se ajusta a ninguna, encuentra otra categoría más apropiada para la tarea y regresa esa categoría. Si no puedes encontrar ninguna categoría, regresa "Otro".
    Categorías dadas: ["Trabajo", "Personal", "Compras", "Estudios", "Salud", "Hogar", "Social"]
    - solo retorna unicamente la categoria(sin dar explicaciones del por que):
    Tarea: "{tarea.nombre_tarea}"
    """
    try:
        # Genera el contenido usando el modelo de Gemini
        response = await model.generate_content_async(prompt_base)
        # El resultado suele estar en el atributo text del primer candidato
        categoria_obtenida = response.text.strip()
        
        return {"tarea_ingresada": tarea.nombre_tarea, "categoria": categoria_obtenida}

    except Exception as e:
        # Manejo de errores
        raise HTTPException(status_code=500, detail=f"Error al conectar con la API de Gemini: {str(e)}")