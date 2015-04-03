import Ember from 'ember';

var $ = Ember.$;

/**
 * @class InViewportManager
 */
function InViewportManager(options) {
  options = options || {};
  this.offset = undefined !== options.offset ? parseInt(options.offset, 10) : 150;
  this.throttle = undefined !== options.throttle ? options.throttle : 150;

  this.guid = 0;
  this.queue = {};
  this.viewCount = 0;
  this.isObserving = false;
}

InViewportManager.prototype.startObserving = function() {
  var self = this;
  function throttledProcessor() {
    Ember.run.throttle(self, self.processQueue, self.throttle, false);
  }
  $(window).on('scroll.InViewportManager', throttledProcessor)
           .on('resize.InViewportManager', throttledProcessor);
  this.isObserving = true;
};

InViewportManager.prototype.stopObserving = function() {
  $(window).off('.InViewportManager');
  this.isObserving = false;
};

InViewportManager.prototype.queueView = function(view) {
  if (view._inViewportId) {
    this.dequeueView(view);
  }
  var id = '' + this.guid;
  view._inViewportId = id;
  this.queue[id] = view;
  this.viewCount++;
  this.guid++;
  if (!this.isObserving) {
    this.startObserving();
  }
};

InViewportManager.prototype.dequeueView = function(view) {
  var id = view._inViewportId;
  if (id) {
    view._inViewportId = null;
    delete this.queue[id];
    this.viewCount--;
    if (this.viewCount === 0) {
      this.stopObserving();
    }
  }
};

InViewportManager.prototype.processQueue = function() {
  var queue = this.queue;
  var id, view, element;

  for (id in queue) {
    if (queue.hasOwnProperty(id)) {
      view = queue[id];
      element = view.get('element');
      if (this.isElementInViewport(element)) {
        view.set('didEnterViewport', true);
        this.dequeueView(view);
      }
    }
  }
};

InViewportManager.prototype.isElementInViewport = function(element) {
  var rect = element.getBoundingClientRect();
  var offset = this.offset;

  return rect.bottom > 0 - offset &&
         rect.right > 0 - offset &&
         rect.left < (window.innerWidth || document.documentElement.clientWidth) + offset &&
         rect.top < (window.innerHeight || document.documentElement.clientHeight) + offset;
};

export default InViewportManager;
