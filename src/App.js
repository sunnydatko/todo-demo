import { useState } from 'react';
import { Button, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

function App() {
  const [todoItem, setTodoItem] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const addItem = () => {
    todoItem && setAllItems((items) => [todoItem, ...items]);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setTodoItem(event.target.value);
  };

  const CustomModal = () => {
    return (
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={showModal}
        onClose={() => setShowModal(!showModal)}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant='h6' id='modal-title'>
            Todo Item
          </Typography>
          <Typography variant='subtitle1' id='simple-modal-description'>
            {modalText}
          </Typography>
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Modal
        onClose={() => setShowModal(!showModal)}
        message={modalText}
        show={showModal}
      />
      <h1>Todo List</h1>
      <input
        type='text'
        onChange={handleChange}
        value={todoItem}
        style={{ marginRight: '8px' }}
      />
      <Button type='button' onClick={addItem}>
        Submit
      </Button>
      {allItems.map((item, i) => (
        <p
          key={i}
          onClick={(e) => {
            setShowModal(true);
            setModalText(item);
          }}
          style={{ cursor: 'pointer' }}
        >
          {item}
        </p>
      ))}
      <CustomModal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <p>{modalText}</p>
      </CustomModal>
    </div>
  );
}

export default App;
