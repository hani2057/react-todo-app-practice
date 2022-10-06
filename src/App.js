import React, { useState, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

/*
 *
 * 궁금한 거:
 * 1.
 * Lists.js의 handleDragEnd 함수에서 splice 메서드를 사용하는데 splice는 가변성 함수임
 * (1) 동작에 문제가 없는 이유와 (2) 불변성을 지키려면 어떻게 해야 하는지.
 * (2)에 관해서는 filter를 이용해서 항목을 저장하는 방법도 있던데, 좀 어려워서 그냥 배열을 map으로 복사해줌.
 * 근데 이걸 고쳤더니 갑자기 최적화가 안 되게 돼서 느려짐... 근데 어떻게 고쳐야 할 지 잘 모르겠다 최적화 개념이 덜 잡힌 듯ㅠ
 *
 * 2.
 * List.js의 handleEditSubmit 함수에서 newTodoData 변수 선언할 때 사용하는
 * map 메서드 내부에서 return data의 역할.
 * 없으면 에러 나던데 정확하게 어떤 프로세스인지 잘 모르겠음.(근데 이건 js인듯...)
 * 아 각 element에 대해 값을 리턴해주는 거고, 리턴된 값이 배열에 담기는 거구나...!!
 *
 * 3.
 * 로컬스토리지에 체크박스 상태는 유지가 안 됨. 원인을 못 찾겠음.
 * 원인을 찾았다!! js가 아니라 CSS문제였음. defaultChecked 속성을 todo의 completed랑 맞춰주면 된다.
 *
 */

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  console.log("App component re-rendered");

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleRemoveClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      // console.log("newTodoData", newTodoData);
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

  const handleRemoveAllClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveAllClick}>모두 삭제</button>
        </div>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleRemoveClick={handleRemoveClick}
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
