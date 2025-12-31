import { useEffect, useRef, useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const pause = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const format = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;

    const pad = (n: number) => (n < 10 ? "0" + n : n);

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.timer}>{format(time)}</div>

      <div style={styles.buttonGroup}>
        <button style={styles.startBtn} onClick={start}>
          ▶ Start
        </button>
        <button style={styles.pauseBtn} onClick={pause}>
          ⏸ Pause
        </button>
      </div>

      <button style={styles.resetBtn} onClick={reset}>
        🔄 Reset
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    backgroundColor: "#f7f4ed",
    fontFamily: "Verdana, sans-serif",
  },
  timer: {
    fontSize: "50px",
    fontWeight: "bold",
    background: "#fff",
    padding: "15px 30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  startBtn: {
    padding: "10px 22px",
    border: "none",
    fontSize: "18px",
    fontWeight: 600,
    backgroundColor: "#8fce88",
    borderRadius: "10px",
    cursor: "pointer",
  },
  pauseBtn: {
    padding: "10px 22px",
    border: "none",
    fontSize: "18px",
    fontWeight: 600,
    backgroundColor: "#ffb476",
    borderRadius: "10px",
    cursor: "pointer",
  },
  resetBtn: {
    width: "180px",
    padding: "10px 22px",
    border: "none",
    fontSize: "18px",
    fontWeight: 600,
    backgroundColor: "#e86161",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Stopwatch;
