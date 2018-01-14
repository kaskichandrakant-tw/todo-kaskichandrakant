let Account = require('../appModules/account.js');
let assert = require('chai').assert;

describe('Account', function() {
  describe('#addTodoList', function() {
    it('will add the todolist in given account', function() {
      let account = new Account('***REMOVED***', 'nothing');
      account.addTodoList('somthing', 'do something');
      assert.equal(account.getTotalTodoCount(), 1)
      account.addTodoList('somthing', 'do something else');
      assert.equal(account.getTotalTodoCount(), 2)
    })
  })
  describe('#removeTodoList', function() {
    it('should remove the specific todoList', function() {
      let account = new Account('***REMOVED***', 'nothing');
      account.addTodoList('somthing', 'nothing')
      assert.equal(account.getTotalTodoCount(), 1)
      account.removeTodoList(1);
      assert.equal(account.getTotalTodoCount(), 0);
    })
  })
  describe('#changeTitle', function() {
    it('should change the title of specific todo', function() {
      let account = new Account('***REMOVED***', 'nothing');
      account.addTodoList('somthing', 'nothing');
      assert.equal(account.getTitle(1), 'somthing')
      account.changeTitle(1, 'somthing else')
      assert.equal(account.getTitle(1), 'somthing else')
    })
  })
  describe('#changeDescription', function() {
    it('should be able to change the description of todo', function() {
      let account = new Account('***REMOVED***', 'nothing');
      account.addTodoList('somthing', 'nothing');
      assert.equal(account.getDescription(1), 'nothing');
      account.changeDescription(1, 'somthing else');
      assert.equal(account.getDescription(1), 'somthing else');
    })
  })
  describe('#addTask', function() {
    it('should be able to add task in todo', function() {
      let account = new Account('***REMOVED***', 'nothing');
      account.addTodoList('somthing', 'nothing');
      account.addTask(1, 'do something');
      assert.equal(account.getTotalTaskCount(), 1)
      account.addTask(1, 'do something else');
      assert.equal(account.getTotalTaskCount(), 2)
    })
  })
  describe('#taskDone', function() {
    it('should be able to change the task status of todo', function() {
      let account = new Account('***REMOVED***', 'nothing');
      account.addTodoList('somthing', 'nothing');
      account.addTask(1, 'do something');
      account.taskDone(1, 1);
      assert.isOk(account.isDone(1, 1));
      account.addTask(1, 'do something else');
      assert.isNotOk(account.isDone(1, 2));
    })
  })
})
