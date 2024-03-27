// App.js File 
import React, { Component } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup"; 
  
class TodosCards extends Component { 
    constructor(props) { 
        super(props); 
  
        // Setting up state 
        this.state = { 
            todo: "", 
            todoItem: {
                todo: "",
                status: "",
                assignee: "",
                deadLine: "",
            },
            list: [], 
        }; 
    } 
  
    // Set a user input value 
    updateInput(value) { 
        this.setState((preState) => ({ 
            todo: value, 
            todoItem: {...preState , todo: value},
        })); 
    } 
  
    // Add item if user input in not empty 
    addItem() { 
        if (this.state.todo !== "") { 
            const todo = { 
                // Add a random id which is used to delete 
                id: Math.random(), 
  
                // Add a user value to list 
                value: this.state.todo, 
                
            }; 
  
            // Update list 
            const list = [...this.state.list]; 
            list.push(todo); 
  
            // reset state 
            this.setState({ 
                list, 
                todo: "",
                todoItem: {
                    todo: "",
                    status: "",
                    assignee: "",
                    deadLine: ""
                }
            }); 
        } 
    } 
  
    // Function to delete item from list use id to delete 
    deleteItem(key) { 
        const list = [...this.state.list]; 
  
        // Filter values and leave value which we need to delete 
        const updateList = list.filter((item) => item.id !== key); 
  
        // Update list in state 
        this.setState({ 
            list: updateList, 
        }); 
    } 
  
    editItem = (index) => { 
      const todos = [...this.state.list]; 
      const editedTodo = prompt('Edit the todo:'); 
      if (editedTodo !== null && editedTodo.trim() !== '') { 
        let updatedTodos = [...todos] 
        updatedTodos[index].value= editedTodo 
        this.setState({ 
          list: updatedTodos, 
      }); 
      } 
    } 
  
    render() { 
        return ( 
            <Container> 
                <Row 
                    style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        fontSize: "2rem", 
                        fontWeight: "bolder", 
                    }} 
                > 
                    {this.props.head}
                </Row> 
  
                <hr /> 
                <Row> 
                    <Col md={{ span: 0, offset: 0 }}> 
                        <InputGroup className="mb-3"> 
                            <FormControl 
                                placeholder="Add Todo..."
                                size="lg"
                                value={this.state.todo} 
                                onChange={(item) => 
                                    this.updateInput(item.target.value) 
                                } 
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            /> 
                            <InputGroup> 
                                <Button 
                                    variant="dark"
                                    className="mt-2"
                                    onClick={() => this.addItem()} 
                                > 
                                    ADD 
                                </Button> 
                            </InputGroup> 
                        </InputGroup> 
                    </Col> 
                </Row> 
                <Row> 
                    <Col md={{ span: 0, offset: 0 }}> 
                        <ListGroup> 
                            {/* map over and print items */} 
                            {this.state.list.map((item, index) => { 
                                return ( 
                                  <div key = {index} >  
                                    <ListGroup.Item 
                                        variant="dark"
                                        action 
                                        style={{display:"flex", 
                                                justifyContent:'space-between'
                                      }} 
                                    > 
                                        {item.value} 
                                        <span> 
                                        <Button style={{marginRight:"10px"}} 
                                        variant = "light"
                                        onClick={() => this.deleteItem(item.id)}> 
                                          Delete 
                                        </Button> 
                                        <Button variant = "light"
                                        onClick={() => this.editItem(index)}> 
                                          Edit 
                                        </Button> 
                                        </span> 
                                    </ListGroup.Item> 
                                  </div> 
                                ); 
                            })} 
                        </ListGroup> 
                    </Col> 
                </Row> 
            </Container> 
        ); 
    } 
} 
  
export default TodosCards; 