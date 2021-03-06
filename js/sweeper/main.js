define([
  'jquery'
, 'underscore'
, 'backbone'
, 'bowser'
, 'mod/timer'
, 'mod/mouse_button'
, 'sweeper/app'
, 'sweeper/views/main'
, 'sweeper/views/utils/popup'
, 'sweeper/views/utils/menu'
], function($, _, Backbone, bowser, Timer, mouseButton, app, MainView, popup, menu) {

  function initialize() {
    app.wrapper = $('#wrapper')

    app.timer = new Timer()
    app.mouse = mouseButton

    var mainView = new MainView()
    app.wrapper.html(mainView.render().el)

    app.popup = popup

    $('.popup-link').click(function(e) {
      e.preventDefault()
      var link = $(this)
      popup.open({
        html: $('#' + link.data('content-id')).html()
      })
    })

    var _gamelevels = {
      easy: {rows: 9, columns: 9, mines: 10, name: 'Beginner'}
    , medium: {rows: 16, columns: 16, mines: 40, name: 'Intermediate'}
    , hard: {rows: 16, columns: 30, mines: 99, name: 'Expert'}
    }

    app.levels = {
      all: function() {
        return _.clone(_gamelevels)
      }
    , get: function(key) {
        return _.clone(_gamelevels[key])
      }
    , _current: 'easy'
    , use: function(key) {
        this._current = key
        app.config = this.get(key)
      }
    , currentLevel: function() {
        return this._current
      }
    }
    app.levels.use('easy')

    app.menu = menu
    $('.menu-popup-link').click(function(e) {
      e.preventDefault()
      menu.show()
    })

    app.trigger('game:start')
  }

  return {
    initialize: initialize
  }
})
