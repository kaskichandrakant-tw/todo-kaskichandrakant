let User = require('../appModules/user.js');
let assert = require('chai').assert;
let userInfoSrc = './testUser.json'
let user = new User(userInfoSrc);



describe('#user', function() {
  describe('#loadAllUsers', function() {
    it('will load the all information about users', function() {
      user.loadAllUsers();
      assert.deepEqual(user.getUserInfo('***REMOVED***'), {})
    })
  })
  describe('#addTodoList', function() {
    it('should change the task status as not done', function() {
      user.loadAllUsers();
      user.addTodoList('***REMOVED***', 'NOTHING', 'nothing')
      assert.equal(user.getUserInfo('***REMOVED***')['NOTHING'].title, 'NOTHING')
    })
  })
  describe('#removeTodoList', function() {
    it('should remove the specific todoList', function() {
      user.loadAllUsers();
      user.addTodoList('***REMOVED***', 'NOTHING', 'nothing')
      assert.equal(user.getUserInfo('***REMOVED***')['NOTHING'].title, 'NOTHING')
      user.removeTodoList('***REMOVED***', 'NOTHING')
      user.addTodoList('***REMOVED***', 'SOMETHING', 'sometning')
      assert.notDeepEqual(user.getUserInfo('***REMOVED***'), {})
      user.removeTodoList('***REMOVED***', 'SOMETHING')
      assert.deepEqual(user.getUserInfo('***REMOVED***'), {})
    })
  })
  describe('#changeTitle', function() {
    it('should be able to change the title of todo', function() {
      user.loadAllUsers();
      user.addTodoList('***REMOVED***', 'NOTHING', 'nothing');
      user.changeTitle('***REMOVED***','NOTHING','SOMETHING')
      assert.equal(user.getUserInfo('***REMOVED***')['SOMETHING'].description, 'nothing')
    })
  })
  describe('#changeDescription', function() {
    it('should be able to change the title of todo', function() {
      user.loadAllUsers();
      user.addTodoList('***REMOVED***', 'NOTHING', 'nothing');
      user.changeDescription('***REMOVED***','NOTHING','SOMETHING')
      assert.equal(user.getUserInfo('***REMOVED***')['NOTHING'].description, 'SOMETHING')
    })
  })
  describe('#addTask', function() {
    it('should be able to change the title of todo', function() {
      user.loadAllUsers();
      user.addTodoList('***REMOVED***', 'NOTHING', 'nothing');
      user.addTask('***REMOVED***','NOTHING','do something');
      let actual=user.getTasks('***REMOVED***','NOTHING')['do something'].task
      let expected='do something'
      assert.equal(actual,expected);
    })
  })
})
