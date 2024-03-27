import logo from './logo.svg';
import './App.css';
import TodosCards from './components/todos/todosList';
import { useEffect, useState } from 'react';
import AutoGrid from './components/utils/autogrid';
import MultipleSelectCheckmarks from './components/utils/multipleSelectCheckmarks';
import { getTodos } from './components/api/tods';
import { Button } from '@mui/material';

function App() {
  const [cards, setCards] = useState([]);
  const [todos, setTodos] = useState([]);

  const deletItem = (card) => {
    const filtered = cards.filter(ele => ele === card)
    setCards(filtered)
  }

  const addItem = (cards) => {
    setCards([...cards]);
  };

  function getTodosFromDb () {
    const todos = getTodos();
    console.log('getTodos :: ', getTodos);
    this.setState({todos: todos});
  }

  useEffect(() => {
    // Uncomment following lines to fetch todos from DB
    // getTodosFromDb()
  }, [])

  return (
    <div className="App">      
      <main>
        <div>
          <MultipleSelectCheckmarks addItem={addItem} deletItem={deletItem} />
        </div>
        <div>
          <Button onClick={() => getTodos()} variant='contained'>Fetch Todos</Button>
        </div>
        <div className='p-5'>
          <AutoGrid cards={cards} />
        </div>
      </main>
    </div>
  );
}

export default App;
