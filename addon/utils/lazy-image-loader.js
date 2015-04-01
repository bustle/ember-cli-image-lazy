import Ember from 'ember';
/**
 * @class LazyImageLoader
 * Manages a queue of ImageViews and only loads them
 * when they are scrolled into the viewport.
 */

function LazyImageLoader(options) {
  var self = this;

  options = options || {};
  this.offset = parseInt(options.offset, 10) || 150;
  this.throttle = options.throttle || 200;

  this._guid = 0;
  this._queue = {};

  Ember.$(window).on('scroll', function() {
    Ember.run.throttle(self, self.render, self.throttle);
  }).on('resize', function() {
    Ember.run.throttle(self, self.render, self.throttle);
  });
}

LazyImageLoader.prototype.queueView = function(view) {
  var queueId = '' + this._guid;
  this._queue[queueId] = view;
  this._guid++;
  return queueId;
};

LazyImageLoader.prototype.dequeueView = function(view) {
  delete this._queue[view.queueId];
};

LazyImageLoader.prototype.render = function() {
  var queue = this._queue;
  var queueId, view, element;

  for (queueId in queue) {
    if (queue.hasOwnProperty(queueId)) {
      view = queue[queueId];
      element = view.get('element');
      if (this.checkIfInView(element)) {
        view.setProperties({ canLazyLoad: true, src: element.getAttribute('data-src') });
      }
    }
  }
};

LazyImageLoader.prototype.checkIfInView = function(element) {
  var rect = element.getBoundingClientRect();
  var offset = this.offset;

  return rect.bottom > 0 - offset &&
         rect.right > 0 - offset &&
         rect.left < (window.innerWidth || document.documentElement.clientWidth) + offset &&
         rect.top < (window.innerHeight || document.documentElement.clientHeight) + offset;
};


export default LazyImageLoader;
