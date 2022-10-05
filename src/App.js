import React, { useState, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  console.log("App component");

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));

    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>모두 삭제</button>
        </div>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

// Tailwind CSS 적용 전

// import React, { useState } from "react";
// import "./App.css";
// import Form from "./components/Form";
// import List from "./components/List";

// export default function App() {
//   const [todoData, setTodoData] = useState([]);
//   const [value, setValue] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newTodo = {
//       id: Date.now(),
//       title: value,
//       completed: false,
//     };
//     setTodoData(prev => [...prev, newTodo])
//     setValue("");
//   }

//     return (
//       <div className="container">
//         <div className="todoBlock">
//           <div className="title">
//             <h1>할 일 목록</h1>
//           </div>

//           <List todoData={todoData} setTodoData={setTodoData} />
//           <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />

//         </div>
//       </div>
//     );
// }
