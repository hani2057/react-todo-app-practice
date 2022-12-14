import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleRemoveClick,
  }) => {
    console.log("List component re-rendered");
    console.log(todoData);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleEditSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        console.log(data);
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));

      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded bg-gray-100">
          <div className="items-center">
            <form onSubmit={handleEditSubmit}>
              <input
                value={editedTitle}
                onChange={handleEditChange}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button
              onClick={handleEditSubmit}
              className="px-4 py-2 float-right"
              type="submit"
            >
              저장
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          <div className="items-center">
            <input
              type="checkbox"
              defaultChecked={completed}
              className="mr-2"
              onChange={() => handleCompleteChange(id)}
            />
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div>
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleRemoveClick(id)}
            >
              삭제
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
