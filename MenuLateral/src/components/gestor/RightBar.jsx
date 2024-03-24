import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";
import "../../components/css/gestor.scss";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";




Modal.setAppElement("#root"); 

export const RightBar = () => {
  const [incomeModalIsOpen, setIncomeModalIsOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const [incomeValue, setIncomeValue] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [alert, setAlert] = useState(false);
  const [totalIngresos, setTotalIngresos] = useState(0);
    const [totalEgresos, setTotalEgresos] = useState(0);

  const handleAlertClose = () => {
    setAlert(false);
  };

  const showAlert = (success) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const handleSaveData = (success) => {
    showAlert(success);
  };

 useEffect(() => {
   const user = getAuth().currentUser;
   if (user) {
     const userId = user.uid;
     const db = getDatabase();

     // Obtener y calcular los ingresos
     const ingresosRef = ref(db, `usuarios/${userId}/ingresos`);
     onValue(ingresosRef, (snapshot) => {
       let total = 0;
       snapshot.forEach((childSnapshot) => {
         const ingreso = childSnapshot.val();
         total += parseFloat(ingreso.value);
       });
       setTotalIngresos(total);
     });

     // Obtener y calcular los egresos
     const egresosRef = ref(db, `usuarios/${userId}/egresos`);
     onValue(egresosRef, (snapshot) => {
       let total = 0;
       snapshot.forEach((childSnapshot) => {
         const egreso = childSnapshot.val();
         total += parseFloat(egreso.amount);
       });
       setTotalEgresos(total);
     });
   }
 }, []);

  const openIncomeModal = () => {
    setIncomeModalIsOpen(true);
  };

  const closeIncomeModal = () => {
    setIncomeModalIsOpen(false);
  };

  const openExpenseModal = () => {
    setExpenseModalIsOpen(true);
  };

  const closeExpenseModal = () => {
    setExpenseModalIsOpen(false);
  };

  const handleIncomeSave = () => {
    const user = getAuth().currentUser;
    if (user) {
      const userId = user.uid;
      const db = getDatabase();
      const incomeRef = ref(db, `usuarios/${userId}/ingresos`);
      push(incomeRef, {
        value: incomeValue,
        date: new Date().toISOString(),
      })
        .then(() => {
          setAlert(true);
        })
        .catch((error) => {
          setAlert(false);
        });
    }
    setIncomeValue("");
    closeIncomeModal();
  };

  const handleExpenseSave = () => {
    const user = getAuth().currentUser;
    if (user) {
      const userId = user.uid;
      const db = getDatabase();
      const expenseRef = ref(db, `usuarios/${userId}/egresos`);
      push(expenseRef, {
        name: expenseName,
        description: expenseDescription,
        amount: expenseAmount,
        date: new Date().toISOString(),
      })
        .then(() => {
          setAlert(true);
        })
        .catch((error) => {
          setAlert(false);
        });
    }
    setExpenseName("");
    setExpenseDescription("");
    setExpenseAmount("");
    closeExpenseModal();
  };

  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container-right">
      <Snackbar open={alert} autoHideDuration={2000} onClose={handleAlertClose}>
        {alert ? (
          <Alert severity="success">Datos guardados correctamente</Alert>
        ) : (
          <Alert severity="error">
            Los datos no se guardaron correctamente, favor de volver a
            intentarlo
          </Alert>
        )}
      </Snackbar>

      <div className="first-div">
        <p className="text-ing">Ingresos</p>
        <p className="text-pre">$ {addCommas(totalIngresos.toFixed(2))}</p>
      </div>

      <button className="button-ingresar" onClick={openIncomeModal}>
        Ingresar efectivo
      </button>

      <div className="second-div">
        <p className="text-ing">Egresos</p>
        <p className="text-pre">$ {addCommas(totalEgresos.toFixed(2))}</p>
      </div>

      <button className="button-ingresar" onClick={openExpenseModal}>
        Ingresar gasto
      </button>

      {/* Modal para ingresos */}
      <Modal
        isOpen={incomeModalIsOpen}
        onRequestClose={closeIncomeModal}
        contentLabel="Modal de Ingresos"
        className="react-modal"
        overlayClassName="react-modal-overlay"
      >
        <div className="react-modal-content3">
          <h2 className="text-ings">Ingresar efectivo</h2>
          <input
            type="number"
            placeholder="$ 0.00"
            value={incomeValue}
            onChange={(e) => setIncomeValue(e.target.value)}
            className="modal-input"
          />
          <div className="buttons">
            <button
              className="button-cancelar-modal btn-i"
              onClick={closeIncomeModal}
            >
              Cancelar
            </button>
            <button className="button-guardar-modal" onClick={handleIncomeSave}>
              Guardar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para egresos */}
      <Modal
        isOpen={expenseModalIsOpen}
        onRequestClose={closeExpenseModal}
        contentLabel="Modal de Egresos"
        className="react-modal"
        overlayClassName="react-modal-overlay"
      >
        <div className="react-modal-content">
          <h2 className="text-ings">Ingresar gasto</h2>
          <input
            type="text"
            placeholder="Nombre del gasto"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="modal-input input-name"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            className="modal-input input-desc"
          />
          <input
            type="number"
            placeholder="Monto"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="modal-input input-monto"
          />
          <div className="buttons">
            <button
              className="button-cancelar-modal  btn-i"
              onClick={closeExpenseModal}
            >
              Cancelar
            </button>
            <button
              className="button-guardar-modal"
              onClick={handleExpenseSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
