let TodoApp = require('../appModels/todoApp.js');
let assert = require('chai').assert;

describe('TodoApp', function() {
  describe('#addAccount', function() {
    it('will add the todolist in given todoApp', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh')
      assert.equal(todoApp.getTotalAccounts(), 1)
      todoApp.addAccount('someone')
      assert.equal(todoApp.getTotalAccounts(), 2)
    })
  })
  describe('#addTodoList', function() {
    it('will add the todolist in given todoApp', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh');
      todoApp.addTodoList('shantosh','something', 'do something');
      assert.equal(todoApp.getTotalTodoCount('shantosh'), 1)
      todoApp.addTodoList('shantosh','something', 'do something else');
      assert.equal(todoApp.getTotalTodoCount('shantosh'), 2)
    })
  })
  describe('#removeTodoList', function() {
    it('should remove the specific todoList', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh')
      todoApp.addTodoList('shantosh','something', 'nothing')
      assert.equal(todoApp.getTotalTodoCount('shantosh'), 1)
      todoApp.removeTodoList('shantosh',1);
      assert.equal(todoApp.getTotalTodoCount('shantosh'), 0);
    })
  })
  describe('#changeTitle', function() {
    it('should change the title of specific todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh')
      todoApp.addTodoList('shantosh','something', 'nothing');
      assert.equal(todoApp.getTitle('shantosh',1), 'something')
      todoApp.changeTitle('shantosh',1, 'something else')
      assert.equal(todoApp.getTitle('shantosh',1), 'something else')
    })
  })
  describe('#changeDescription', function() {
    it('should be able to change the description of todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh')
      todoApp.addTodoList('shantosh','something', 'nothing');
      assert.equal(todoApp.getDescription('shantosh',1), 'nothing');
      todoApp.changeDescription('shantosh',1, 'something else');
      assert.equal(todoApp.getDescription('shantosh',1), 'something else');
    })
  })
  describe('#addTask', function() {
    it('should be able to add the task in todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh')
      todoApp.addTodoList('shantosh','something', 'nothing');
      todoApp.addTask('shantosh',1, 'do something');
      assert.equal(todoApp.getTotalTaskCount('shantosh',1), 1)
      todoApp.addTask('shantosh',1, 'do something else');
      assert.equal(todoApp.getTotalTaskCount('shantosh',1), 2)
    })
  })
  describe('#taskDone', function() {
    it('should be able to change task status of todo', function() {
      let todoApp= new TodoApp();
      todoApp.addAccount('shantosh')
      todoApp.addTodoList('shantosh','something', 'nothing');
      todoApp.addTask('shantosh',1, 'do something');
      todoApp.taskDone('shantosh',1, 1);
      assert.isOk(todoApp.isDone('shantosh',1, 1));
      todoApp.addTask('shantosh',1, 'do something else');
      assert.isNotOk(todoApp.isDone('shantosh',1, 2));
    })
  })
})
