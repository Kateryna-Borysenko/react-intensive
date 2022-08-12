import reducer, {
  setUser,
  addTodos,
  completeTodos,
  updateTodos,
  removeTodos,
} from './reducer.js'


describe('reducer testing', () => {

  const INITIAL_STATE = { name: '', todos: [] }
  const CURRENT_STATE = {
    name: 'Kateryna',
    todos: [
      { todo: 'Text Happy birthday to ...', id: 1, completed: false },
    ]
  }

  test('initial state testing', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ ...INITIAL_STATE })
  })

  test('user login testing', () => {
    expect(reducer(...INITIAL_STATE, setUser('Kateryna'))).toEqual({ ...INITIAL_STATE, name: 'Kateryna' })
  })

  test('testing for adding a todo', () => {
    expect(
      reducer(CURRENT_STATE, addTodos({ item: 'Send email over to Ann', id: 2, completed: false }))
    ).toEqual({
      ...CURRENT_STATE,
      todos: [
        ...CURRENT_STATE.todos,
        { item: 'Send email over to Ann', id: 2, completed: false },
      ]
    })
  })

  test('testing for todo status change in completed', () => {
    expect(
      reducer(CURRENT_STATE, completeTodos({ id: 1 }))
    ).toEqual({
      ...CURRENT_STATE,
      todos: CURRENT_STATE.todos.map((todo) => {
        if (todo.id === 1) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      })
    })
  })

  test('testing for updating a todo', () => {
    expect(
      reducer(CURRENT_STATE, updateTodos({ id: 2 }))
    ).toEqual({
      ...CURRENT_STATE,
      todos: CURRENT_STATE.todos.map((todo) => {
        if (todo.id === 2) {
          return {
            ...todo,
            item: 'Send email over to Boss',
          };
        }
        return todo;
      }),
    });
  });

  test('testing for removing a todo', () => {
    expect(
      reducer(CURRENT_STATE, removeTodos({ id: 2 }))
    ).toEqual({
      ...CURRENT_STATE,
      todos: CURRENT_STATE.todos.filter((todo) => todo.id !== 2),
    })
  })

})