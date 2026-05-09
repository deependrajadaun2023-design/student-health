import { useState } from "react";
import axios from "axios";

function App() {

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    course: "",
    year: "",
    cgpa: "",
    marital_status: "",
    anxiety: "",
    panic_attack: "",
    seek_help: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(response.data.prediction);

    } catch (error) {

      console.log(error);

      alert("Backend Connection Error");

    }

    setLoading(false);
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          Student Mental Health Prediction
        </h1>

        <p style={styles.subtext}>
          AI-powered depression prediction system using Machine Learning
        </p>

        <div style={styles.grid}>

          <input
            style={styles.input}
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="course"
            placeholder="Course"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="year"
            placeholder="Year"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="cgpa"
            placeholder="CGPA"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="marital_status"
            placeholder="Marital Status"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="anxiety"
            placeholder="Anxiety (yes/no)"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="panic_attack"
            placeholder="Panic Attack (yes/no)"
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="seek_help"
            placeholder="Seek Help (yes/no)"
            onChange={handleChange}
          />

        </div>

        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          {
            loading
              ? "Predicting..."
              : "Predict Mental Health"
          }
        </button>

        {
          result && (

            <div style={styles.resultBox}>

              <h2>Prediction Result</h2>

              <p
                style={{
                  color:
                    result === "Depression"
                      ? "#ff4d4d"
                      : "#00c853",

                  fontSize: "24px",

                  fontWeight: "bold"
                }}
              >
                {result}
              </p>

            </div>
          )
        }

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "linear-gradient(to right, #141e30, #243b55)",

    padding: "20px",

    fontFamily: "Arial"
  },

  card: {

    width: "100%",

    maxWidth: "700px",

    backgroundColor: "white",

    borderRadius: "20px",

    padding: "40px",

    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },

  heading: {

    textAlign: "center",

    marginBottom: "10px",

    color: "#243b55"
  },

  subtext: {

    textAlign: "center",

    marginBottom: "30px",

    color: "gray"
  },

  grid: {

    display: "grid",

    gridTemplateColumns: "1fr 1fr",

    gap: "15px"
  },

  input: {

    padding: "14px",

    borderRadius: "10px",

    border: "1px solid #ccc",

    fontSize: "15px",

    outline: "none"
  },

  button: {

    width: "100%",

    marginTop: "30px",

    padding: "15px",

    backgroundColor: "#243b55",

    color: "white",

    border: "none",

    borderRadius: "12px",

    fontSize: "17px",

    cursor: "pointer",

    transition: "0.3s"
  },

  resultBox: {

    marginTop: "30px",

    padding: "20px",

    borderRadius: "15px",

    backgroundColor: "#f4f6f8",

    textAlign: "center"
  }

};

export default App;