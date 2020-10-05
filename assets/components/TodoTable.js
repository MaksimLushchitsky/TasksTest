import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteDialog from "./DeleteDialog";
import Typography from "@material-ui/core/Typography";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoName, setAddTodoName] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [addTodoStatus, setAddTodoStatus] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [editTodoStatus, setEditTodoStatus] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {name: addTodoName, description: addTodoDescription, status: addTodoStatus});
        setAddTodoName('');
        setAddTodoDescription('');
        setAddTodoStatus('');
    }

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, name: editTodoName, description: editTodoDescription, status: editTodoStatus});
        setEditIsShown(false);
    }

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField type="text" value={addTodoName} onChange={(event) => {
                                    setAddTodoName(event.target.value)
                                }} label="New Task" fullWidth={true}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form>
                                <TextField type="text" value={addTodoDescription} onChange={(event) => {
                                    setAddTodoDescription(event.target.value)
                                }} label="New Description" fullWidth={true} multiline={true}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form>
                                <TextField type="text" value={addTodoStatus} onChange={(event) => {
                                    setAddTodoStatus(event.target.value)
                                }} label="Status" fullWidth={true}/>
                            </form>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton onClick={onCreateSubmit}>
                                +
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <Table>
                        <TableHead>
                            <TableCell>
                                Todo
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {context.todos.slice().reverse().map((todo, index) => (
                                <div className="container">
                                    {todo.status === 'todo' &&
                                    <TableRow key={'todo ' + index}>
                                        {/*Name*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                                    <TextField
                                                        type="text"
                                                        autoFocus={true}
                                                        fullWidth={true}
                                                        value={editTodoName}
                                                        onChange={(event) => {
                                                            setEditTodoName(event.target.value)
                                                        }}
                                                    />
                                                </form>
                                                :
                                                <Typography>{todo.name}</Typography>
                                            }
                                        </TableCell>

                                        {/*Description*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <TextField
                                                    type="text"
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    value={editTodoDescription}
                                                    onChange={(event) => {
                                                        setEditTodoDescription(event.target.value)
                                                    }}
                                                />
                                                :
                                                <Typography
                                                    style={{whiteSpace: "pre-wrap"}}>{todo.description}</Typography>
                                            }
                                        </TableCell>

                                        {/*Status*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <TextField
                                                    type="text"
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    value={editTodoStatus}
                                                    onChange={(event) => {
                                                        setEditTodoStatus(event.target.value)
                                                    }}
                                                />
                                                :
                                                <Typography>{todo.status}</Typography>
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <Fragment>
                                                    <Button onClick={() => {
                                                        setEditIsShown(false)
                                                    }}>Cancel</Button>
                                                    <Button onClick={onEditSubmit.bind(this, todo.id)}>Save</Button>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <IconButton onClick={() => {
                                                        setEditIsShown(todo.id);
                                                        setEditTodoName(todo.name)
                                                        setEditTodoDescription(todo.description)
                                                        setEditTodoStatus(todo.status)
                                                    }}>
                                                        Edit
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        setDeleteConfirmationIsShown(true);
                                                        setTodoToBeDeleted(todo)
                                                    }}>
                                                        Delete
                                                    </IconButton>
                                                </Fragment>
                                            }
                                        </TableCell>
                                    </TableRow>
                                    }
                                </div>
                            ))}
                        </TableBody>
                    </Table>
                    <Table>
                        <TableHead>
                            <TableCell>
                                Doing
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {context.todos.slice().reverse().map((todo, index) => (
                                <div className="container">
                                    {todo.status === 'doing' &&
                                    <TableRow key={'todo ' + index}>
                                        {/*Name*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                                    <TextField
                                                        type="text"
                                                        autoFocus={true}
                                                        fullWidth={true}
                                                        value={editTodoName}
                                                        onChange={(event) => {
                                                            setEditTodoName(event.target.value)
                                                        }}
                                                    />
                                                </form>
                                                :
                                                <Typography>{todo.name}</Typography>
                                            }
                                        </TableCell>

                                        {/*Description*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <TextField
                                                    type="text"
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    value={editTodoDescription}
                                                    onChange={(event) => {
                                                        setEditTodoDescription(event.target.value)
                                                    }}
                                                />
                                                :
                                                <Typography
                                                    style={{whiteSpace: "pre-wrap"}}>{todo.description}</Typography>
                                            }
                                        </TableCell>

                                        {/*Status*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <TextField
                                                    type="text"
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    value={editTodoStatus}
                                                    onChange={(event) => {
                                                        setEditTodoStatus(event.target.value)
                                                    }}
                                                />
                                                :
                                                <Typography>{todo.status}</Typography>
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <Fragment>
                                                    <Button onClick={() => {
                                                        setEditIsShown(false)
                                                    }}>Cancel</Button>
                                                    <Button onClick={onEditSubmit.bind(this, todo.id)}>Save</Button>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <IconButton onClick={() => {
                                                        setEditIsShown(todo.id);
                                                        setEditTodoName(todo.name)
                                                        setEditTodoDescription(todo.description)
                                                        setEditTodoStatus(todo.status)
                                                    }}>
                                                        Edit
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        setDeleteConfirmationIsShown(true);
                                                        setTodoToBeDeleted(todo)
                                                    }}>
                                                        Delete
                                                    </IconButton>
                                                </Fragment>
                                            }
                                        </TableCell>
                                    </TableRow>
                                    }
                                </div>
                            ))}
                        </TableBody>
                    </Table>
                    <Table>
                        <TableHead>
                            <TableCell>
                                Done
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {context.todos.slice().reverse().map((todo, index) => (
                                <div className="container">
                                    {todo.status === 'done' &&
                                    <TableRow key={'todo ' + index}>
                                        {/*Name*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                                    <TextField
                                                        type="text"
                                                        autoFocus={true}
                                                        fullWidth={true}
                                                        value={editTodoName}
                                                        onChange={(event) => {
                                                            setEditTodoName(event.target.value)
                                                        }}
                                                    />
                                                </form>
                                                :
                                                <Typography>{todo.name}</Typography>
                                            }
                                        </TableCell>

                                        {/*Description*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <TextField
                                                    type="text"
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    value={editTodoDescription}
                                                    onChange={(event) => {
                                                        setEditTodoDescription(event.target.value)
                                                    }}
                                                />
                                                :
                                                <Typography
                                                    style={{whiteSpace: "pre-wrap"}}>{todo.description}</Typography>
                                            }
                                        </TableCell>

                                        {/*Status*/}
                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <TextField
                                                    type="text"
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    value={editTodoStatus}
                                                    onChange={(event) => {
                                                        setEditTodoStatus(event.target.value)
                                                    }}
                                                />
                                                :
                                                <Typography>{todo.status}</Typography>
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {editIsShown === todo.id ?
                                                <Fragment>
                                                    <Button onClick={() => {
                                                        setEditIsShown(false)
                                                    }}>Cancel</Button>
                                                    <Button onClick={onEditSubmit.bind(this, todo.id)}>Save</Button>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <IconButton onClick={() => {
                                                        setEditIsShown(todo.id);
                                                        setEditTodoName(todo.name)
                                                        setEditTodoDescription(todo.description)
                                                        setEditTodoStatus(todo.status)
                                                    }}>
                                                        Edit
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        setDeleteConfirmationIsShown(true);
                                                        setTodoToBeDeleted(todo)
                                                    }}>
                                                        Delete
                                                    </IconButton>
                                                </Fragment>
                                            }
                                        </TableCell>
                                    </TableRow>
                                    }
                                </div>
                            ))}
                        </TableBody>
                    </Table>
                </TableBody>
            </Table>

            {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted}
                              open={deleteConfirmationIsShown}
                              setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}
        </Fragment>
    );
}

export default TodoTable;