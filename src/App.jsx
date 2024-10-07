import { useState } from 'react';
import './App.css';
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { add, remove, update } from './Store/todoSlice';
import { useSelector } from 'react-redux';

function App() {

  let todos = useSelector(state => state.todo);
  const dispatch = useDispatch();

  // States
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === '') return;

    // Handle update and add operations
    if (isEditing) {
      const updatedTodo = {
        id: isEditing,
        todo: todo
      }
      const index = todos.findIndex((todo) => todo.id === isEditing);
      dispatch(update({ updatedTodo, index }))
      setIsEditing(null);
      setTodo("");
    } else {
      const newTodo = {
        id: uuid(),
        todo: todo
      }
      dispatch(add(newTodo));
      setTodo('');
    }
  }

  // Open edit section 
  const handleEdit = (id, index) => {
    setIsEditing(id);
    setTodo(todos[index].todo);
  }

  // Close edit section
  const handleCloseEdit = () => {
    setIsEditing(null);
    setTodo("");
  }

  // Filtered todos
  const filteredTodo =
    todos.filter((todo) => {
      return todo.todo.toLowerCase()
        .includes(searchQuery.toLowerCase())
    })

  // Delete todo 
  const handleDelete = (id) => {
    dispatch(remove(id))
  }
  return (
    <>
      <Container sx={{ overflow: 'none' }}>
        <Typography variant='h2' mb='30px'>Todo List✔️</Typography>
        <form action="" onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <TextField
              id="outlined-basic" label={isEditing ? "Edit Todo" : "Add Todo"} variant="outlined" value={todo} onChange={(e) => setTodo(e.target.value)} />
            {!isEditing && <Button variant='contained' type='submit'>Add Todo</Button>}
            <TextField
              id="standard-search"
              label="Search Todo"
              type="search"
              variant="standard"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          {/* Update Todo block */}
          {
            isEditing && (
              <>
                <Box sx={{
                  display: 'flex',
                  marginTop: '20px',
                  gap: '20px'
                }}>
                  <Button variant='contained' type='submit' onClick={handleSubmit}>Edit</Button>
                  <Button variant='contained' onClick={() => handleCloseEdit()}>Cancel</Button>
                </Box>
              </>
            )
          }

        </form>
        {/* Todo list */}
        <div>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            textAlign: 'start'
          }}>
            {
              todos.length > 0 ?

                filteredTodo.length > 0 && filteredTodo.map((todo, index) => (
                  <li
                    key={todo.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      flexWrap: 'wrap'
                    }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}>
                      <span style={{
                        borderRadius: '100px',
                        background: '#2979ff',
                        color: '#fff',
                        padding: '3px 10px',
                        fontSize: '20px'
                      }}>{index + 1}</span>
                      <p style={{ maxWidth: '100%' }}>
                        {todo.todo}
                      </p>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px'
                      }}
                    >
                      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(todo.id)} >
                        Delete
                      </Button>
                      <Button variant="contained" startIcon={<EditIcon />} onClick={() => handleEdit(todo.id, index)}>
                        Edit
                      </Button>
                    </Box>
                  </li>
                ))

                : <Typography variant='h4' sx={{ marginBlock: '25px' }}>No Todo Available</Typography>
            }
          </ul>
        </div>
      </Container>
    </>
  )
}

export default App
