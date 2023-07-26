import { useState } from "react";

export default function Todolist() {
  const initItems = [
    { isChecked: true, link: "", description: "Go to www.mysql.com" },
    { isChecked: true, link: "", description: "Download installer" },
    { isChecked: false, link: "", description: "Execute" },
  ];

  const [items, setItems] = useState(initItems);

  // TODO: Add username
  // Logout button

  return (
    <>
      <h1>Todolist</h1>
      {items.map((todo) => (
        <div>
          <input type="checkbox" checked={todo.isChecked} />
          <button>View</button>
          {todo.description}
        </div>
      ))}
    </>
  );
}
