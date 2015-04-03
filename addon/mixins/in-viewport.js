import Ember from 'ember';
import InViewportManager from '../utils/in-viewport-manager';

var defaultInViewportManager = new InViewportManager();

/**
 * InViewportMixin
 * An Ember View mixin that tracks when the view
 * enters the viewport
 */
export default Ember.Mixin.create({
  didEnterViewport: false,
  inViewportManager: defaultInViewportManager,

  checkIfInViewport: function() {
    return this.inViewportManager.isElementInViewport(this.get('element'));
  },

  _setupInViewportMixin: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      if (this.checkIfInViewport()) {
        this.set('didEnterViewport', true);
      } else {
        this.inViewportManager.queueView(this);
      }
    });
  }),

  _teardownInViewportMixin: Ember.on('willDestroyElement', function() {
    this.inViewportManager.dequeueView(this);
  })
});
