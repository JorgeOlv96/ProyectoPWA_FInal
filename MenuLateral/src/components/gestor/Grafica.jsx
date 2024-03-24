import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../credenciales";
import "../../components/css/gestor.scss";

const Grafica = () => {
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(firebaseConfig);
    const user = getAuth().currentUser;
    if (user) {
      const userId = user.uid;

      const ingresosRef = ref(db, `usuarios/${userId}/ingresos`);
      const egresosRef = ref(db, `usuarios/${userId}/egresos`);

      // Obtener y almacenar los datos de ingresos
      onValue(ingresosRef, (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const ingreso = childSnapshot.val();
          data.push({
            value: parseFloat(ingreso.value),
            date: new Date(ingreso.date),
          });
        });
        setIngresos(data);
      });

      // Obtener y almacenar los datos de egresos
      onValue(egresosRef, (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const egreso = childSnapshot.val();
          data.push({
            value: parseFloat(egreso.amount),
            date: new Date(egreso.date),
          });
        });
        setEgresos(data);
      });
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: generateLabels(),
        datasets: [
          {
            label: "Ingresos",
            data: fillDataWithZeros(ingresos),
            borderColor: "#ff2833",
            borderWidth: 2,
          },
          {
            label: "Egresos",
            data: fillDataWithZeros(egresos),
            borderColor: "#1570EF",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "$" + value.toFixed(2); // Formato de los ticks del eje Y
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [ingresos, egresos]);

  const generateLabels = () => {
    const today = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
      (day) => day.toString()
    );
    return labels;
  };

  const fillDataWithZeros = (data) => {
    const filledData = Array.from({ length: 31 }, () => 0);
    data.forEach((item) => {
      const day = item.date.getDate();
      filledData[day - 1] = item.value;
    });
    return filledData;
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBottom: 20,
          color: "#5a5a5a",
        }}
      >
        Gráfico de los ingresos y egresos del mes actual
      </h2>
      <canvas id="myChart" width="400" height="300"></canvas>
    </div>
  );
};

export default Grafica;
