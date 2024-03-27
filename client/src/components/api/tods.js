export async function getTodos() {
    const response = await fetch("http://localhost:3005/todos");
    const movies = await response.json();
    console.log(movies);
  }