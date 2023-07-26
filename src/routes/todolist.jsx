import { useState } from "react";
// import { Button } from "@chakra-ui/react";

export default function Todolist() {
  const initItems = [
    { isChecked: true, link: "", description: "Go to www.mysql.com" },
    { isChecked: true, link: "", description: "Download installer" },
    { isChecked: false, link: "", description: "Execute" },
    { isChecked: false, link: "", description: "Review" },
    { isChecked: false, link: "", description: "Todo 1" },
    { isChecked: false, link: "", description: "Todo 2" },
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
