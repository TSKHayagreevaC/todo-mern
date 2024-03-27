export async function getTodos() {
    const response = await fetch("http://localhost:3005/todos");
    const todos = await response.json();
    return todos;
  }