let TodoApp = require('../appModules/todoApp.js');
let assert = require('chai').assert;

describe('TodoApp', function() {
  describe('#addAccount', function() {
    it('will add the todolist in given todoApp', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***')
      assert.equal(todoApp.getTotalAccounts(), 1)
      todoApp.addAccount('someone')
      assert.equal(todoApp.getTotalAccounts(), 2)
    })
  })
  describe('#addTodoList', function() {
    it('will add the todolist in given todoApp', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***');
      todoApp.addTodoList('***REMOVED***','something', 'do something');
      assert.equal(todoApp.getTotalTodoCount('***REMOVED***'), 1)
      todoApp.addTodoList('***REMOVED***','something', 'do something else');
      assert.equal(todoApp.getTotalTodoCount('***REMOVED***'), 2)
    })
  })
  describe('#removeTodoList', function() {
    it('should remove the specific todoList', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***')
      todoApp.addTodoList('***REMOVED***','something', 'nothing')
      assert.equal(todoApp.getTotalTodoCount('***REMOVED***'), 1)
      todoApp.removeTodoList('***REMOVED***',1);
      assert.equal(todoApp.getTotalTodoCount('***REMOVED***'), 0);
    })
  })
  describe('#changeTitle', function() {
    it('should change the title of specific todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***')
      todoApp.addTodoList('***REMOVED***','something', 'nothing');
      assert.equal(todoApp.getTitle('***REMOVED***',1), 'something')
      todoApp.changeTitle('***REMOVED***',1, 'something else')
      assert.equal(todoApp.getTitle('***REMOVED***',1), 'something else')
    })
  })
  describe('#changeDescription', function() {
    it('should be able to change the description of todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***')
      todoApp.addTodoList('***REMOVED***','something', 'nothing');
      assert.equal(todoApp.getDescription('***REMOVED***',1), 'nothing');
      todoApp.changeDescription('***REMOVED***',1, 'something else');
      assert.equal(todoApp.getDescription('***REMOVED***',1), 'something else');
    })
  })
  describe('#addTask', function() {
    it('should be able to add the task in todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***')
      todoApp.addTodoList('***REMOVED***','something', 'nothing');
      todoApp.addTask('***REMOVED***',1, 'do something');
      assert.equal(todoApp.getTotalTaskCount('***REMOVED***',1), 1)
      todoApp.addTask('***REMOVED***',1, 'do something else');
      assert.equal(todoApp.getTotalTaskCount('***REMOVED***',1), 2)
    })
  })
  describe('#taskDone', function() {
    it('should be able to change task status of todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('***REMOVED***')
      todoApp.addTodoList('***REMOVED***','something', 'nothing');
      todoApp.addTask('***REMOVED***',1, 'do something');
      todoApp.taskDone('***REMOVED***',1, 1);
      assert.isOk(todoApp.isDone('***REMOVED***',1, 1));
      todoApp.addTask('***REMOVED***',1, 'do something else');
      assert.isNotOk(todoApp.isDone('***REMOVED***',1, 2));
    })
  })
})
