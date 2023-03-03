import React from 'react'

const ControlPrespuesto = ({presupuesto}) => {
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            Grafica aquí
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span>${presupuesto}
            </p>
        </div>
    </div>
  )
}

export default ControlPrespuesto