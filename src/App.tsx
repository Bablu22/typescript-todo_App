import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Container, List, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Header from './Components/Header/Header';
import AddIcon from '@mui/icons-material/Add';
import './App.css'
import { IconButton, ListItem, ListItemText } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

interface ITodos {
  id: number;
  text: string;
}

function App() {

  const getValue = () => {
    const data: any = localStorage.getItem("todos") || ""

    if (data) {
      return JSON.parse(localStorage.getItem("todos") || "")
    }
    else {
      return []
    }
  }

  const [task, setTask] = useState<string>("")
  const [id, setId] = useState<number>(0)
  const [todos, setTodos] = useState<ITodos[]>(getValue())





  const getInputValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value)
    const id: number = Math.floor(Math.random() * 100000000)
    setId(id)
  }



  const addTask = (): void => {
    const newTask = { text: task, id: id }
    setTodos([...todos, newTask,])
    localStorage.setItem('todos', JSON.stringify([...todos, newTask]))
    setTask("")


  }





  const deleteTask = (id: number): void => {
    const task: any = todos.filter(task => task.id !== id)
    setTodos(task)
    localStorage.setItem('todos', JSON.stringify(task))
  }



  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#ecf0f1', paddingBottom: '100px' }}>
          <div className='form'>
            <TextField
              value={task}
              onChange={getInputValue}
              className='input'
              id="demo-helper-text-aligned"
              label="Type Something..."
            />
            <Button
              onClick={addTask}
              className='btn'
              variant="contained"
              startIcon={<AddIcon />}
            >Add
            </Button>
          </div>
          <div className='task-container'>
            {
              todos.map((todo: ITodos) => {
                return <List className='task' sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' }}>
                  <ListItem

                    disableGutters
                    secondaryAction={
                      <IconButton sx={{ color: 'red' }} onClick={() => deleteTask(todo.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${todo.text}`} />
                  </ListItem>
                </List>
              })
            }
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default App;
