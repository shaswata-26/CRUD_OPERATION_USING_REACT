import { EmployeeData } from "./components/EmployeeData";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(null); // Change initial id to null for clarity

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id); // Use find for a single item
    if (dt) {
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
      setId(dt.id); // Set the id for the item being edited
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the data?")) {
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  const handleUpdate = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, firstName, lastName, age } // Update the correct item
          : item
      )
    );
    handleClear(); // Clear fields after updating
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setId(null); // Reset id to null
  };

  return (
    <div className="App">
      <div className="main" style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="text"
              placeholder="Enter your age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <button className="bg-primary" onClick={handleUpdate} disabled={id === null}>
            Update
          </button>
          <button className="bg-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="bg-primary" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <button className="bg-danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
