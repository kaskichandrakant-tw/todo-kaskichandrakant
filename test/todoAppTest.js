let TodoApp = require('../appModels/todoApp.js');
let assert = require('chai').assert;

describe('TodoApp', function() {
  describe('#addAccount', function() {
    it('will add the todolist in given todoApp', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant')
      assert.equal(todoApp.getTotalAccounts(), 1)
      todoApp.addAccount('someone')
      assert.equal(todoApp.getTotalAccounts(), 2)
    })
  })
  describe('#addTodoList', function() {
    it('will add the todolist in given todoApp', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant');
      todoApp.addTodoList('chandrakant','something', 'do something');
      assert.equal(todoApp.getTotalTodoCount('chandrakant'), 1)
      todoApp.addTodoList('chandrakant','something', 'do something else');
      assert.equal(todoApp.getTotalTodoCount('chandrakant'), 2)
    })
  })
  describe('#removeTodoList', function() {
    it('should remove the specific todoList', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant')
      todoApp.addTodoList('chandrakant','something', 'nothing')
      assert.equal(todoApp.getTotalTodoCount('chandrakant'), 1)
      todoApp.removeTodoList('chandrakant',1);
      assert.equal(todoApp.getTotalTodoCount('chandrakant'), 0);
    })
  })
  describe('#changeTitle', function() {
    it('should change the title of specific todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant')
      todoApp.addTodoList('chandrakant','something', 'nothing');
      assert.equal(todoApp.getTitle('chandrakant',1), 'something')
      todoApp.changeTitle('chandrakant',1, 'something else')
      assert.equal(todoApp.getTitle('chandrakant',1), 'something else')
    })
  })
  describe('#changeDescription', function() {
    it('should be able to change the description of todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant')
      todoApp.addTodoList('chandrakant','something', 'nothing');
      assert.equal(todoApp.getDescription('chandrakant',1), 'nothing');
      todoApp.changeDescription('chandrakant',1, 'something else');
      assert.equal(todoApp.getDescription('chandrakant',1), 'something else');
    })
  })
  describe('#addTask', function() {
    it('should be able to add the task in todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant')
      todoApp.addTodoList('chandrakant','something', 'nothing');
      todoApp.addTask('chandrakant',1, 'do something');
      assert.equal(todoApp.getTotalTaskCount('chandrakant',1), 1)
      todoApp.addTask('chandrakant',1, 'do something else');
      assert.equal(todoApp.getTotalTaskCount('chandrakant',1), 2)
    })
  })
  describe('#taskDone', function() {
    it('should be able to change task status of todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('chandrakant')
      todoApp.addTodoList('chandrakant','something', 'nothing');
      todoApp.addTask('chandrakant',1, 'do something');
      todoApp.taskDone('chandrakant',1, 1);
      assert.isOk(todoApp.isDone('chandrakant',1, 1));
      todoApp.addTask('chandrakant',1, 'do something else');
      assert.isNotOk(todoApp.isDone('chandrakant',1, 2));
    })
  })
})
