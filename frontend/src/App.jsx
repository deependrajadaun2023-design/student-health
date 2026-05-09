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

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

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
  };

  return (

    <div style={{
      width: "400px",
      margin: "auto",
      marginTop: "40px",
      fontFamily: "Arial"
    }}>

      <h1>Student Mental Health Prediction</h1>

      <input
        name="gender"
        placeholder="Gender"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="course"
        placeholder="Course"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="year"
        placeholder="Year"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="cgpa"
        placeholder="CGPA"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="marital_status"
        placeholder="Marital Status"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="anxiety"
        placeholder="Anxiety yes/no"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="panic_attack"
        placeholder="Panic Attack yes/no"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="seek_help"
        placeholder="Seek Help yes/no"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Predict
      </button>

      <br /><br />

      <h2>{result}</h2>

    </div>
  );
}

export default App;