import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastos, setGastos] = useState([]);

  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState();

  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleMostrarModal();
    }
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setGastoEditar({});
    handleMostrarModal();
  };

  const handleMostrarModal = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar el gasto
      setGastos(
        gastos.map((gastoActual) => {
          if (gastoActual.id === gasto.id) {
            return gasto;
          }
          return gastoActual;
        })
      );
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    // Eliminar el gasto
    setGastos(gastos.filter((gasto) => gasto.id !== id));
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
