import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  console.log("Lists component");

  const handleEnd = (result) => {
    console.log(result);

    if (!result.destination) return;

    const newTodoData = todoData;

    // 1. 변경시키는(드래그하는) 아이템을 배열에서 지우고 reorderedItem 변수에 저장
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 2. 원하는 자리에 reorderedItem을 insert하고 todoData state를 변경
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;

// drag and drop 적용 전

// return (
//   <div>
//     {todoData.map((data) => (
//       <div key={data.id}>
//         <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
//           <div className="items-center">
//             <input
//               type="checkbox"
//               defaultChecked={false}
//               className="mr-2"
//               onChange={() => handleCompleteChange(data.id)}
//             />
//             <span className={data.completed ? "line-through" : undefined}>
//               {data.title}
//             </span>
//           </div>
//           <div>
//             <button
//               className="px-4 py-2 float-right"
//               onClick={() => handleClick(data.id)}
//             >
//               x
//             </button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
// }
