import "./styles.css";
import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";

export default function App() {
  const [textValue, setTextValue] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const changeHandler = (e) => {
    setTextValue(e.target.value);
  };

  const addTodoHandler = () => {
    setTodos([...todos, { id: Date.now(), todo: textValue, checked: false }]);
    setTextValue("");
  };

  const checkboxHandler = (editTodoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      })
    );
    setTextValue("");
    setIsEdit(false);
  };

  const editHandler = (editTodo) => {
    setTextValue(editTodo.todo);
    setIsEdit(true);
    setCurrentTodo({ ...editTodo });
  };

  const updateTodoHandler = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === currentTodo.id) {
          return { ...todo, todo: textValue };
        } else {
          return todo;
        }
      })
    );
    setIsEdit(false);
    setTextValue("");
  };

  const deleteHandler = (deleteTodoId) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== deleteTodoId;
      })
    );
  };

  useEffect(() => {
    const storeTodos = JSON.stringify(todos);
    localStorage.setItem("todos", storeTodos);
  }, [todos]);

  return (
    <div className="App">
      <Text fontSize="6xl">Todo App</Text>
      <Input
        htmlSize={50}
        width="auto"
        placeholder="Add Todo"
        type="text"
        value={textValue}
        onChange={changeHandler}
      />
      &nbsp; &nbsp;
      {isEdit ? (
        <Button colorScheme="yellow" onClick={updateTodoHandler}>
          Update Todo{" "}
        </Button>
      ) : (
        <Button colorScheme="purple" onClick={addTodoHandler}>
          Add Todo{" "}
        </Button>
      )}
      <Text fontSize="xl">My Todos</Text>
      <div className="todos-container">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Completed</Th>
                &nbsp;
                <Th>Todo</Th>
                &nbsp;
                <Th>Edit</Th>
                &nbsp;
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos?.map((todo, i) => (
                <Tr key={todo.id}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={todo.checked}
                      onChange={() => checkboxHandler(todo.id)}
                    />
                  </Td>
                  &nbsp;
                  <Td>
                    <span
                      style={{
                        textDecoration: todo.checked ? "line-through" : "none",
                        fontSize: "20px"
                      }}
                    >
                      {todo.todo}
                    </span>
                  </Td>
                  &nbsp;
                  <Td>
                    <Button
                      colorScheme="blue"
                      isDisabled={todo.checked}
                      onClick={() => editHandler(todo)}
                    >
                      Edit
                    </Button>
                  </Td>
                  &nbsp;
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => deleteHandler(todo.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                  &nbsp;
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
