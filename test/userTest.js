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
  describe('#chnageTitle', function() {
    it('should be able to change the title of todo', function() {
      user.loadAllUsers();
      user.addTodoList('***REMOVED***', 'NOTHING', 'nothing');
      user.changeTitle('***REMOVED***','NOTHING','SOMETHING')
      console.log(user.getUserInfo('***REMOVED***'));
      assert.equal(user.getUserInfo('***REMOVED***')['SOMETHING'].description, 'nothing')
    })
  })
})
