import Ember from 'ember';
import LazyImageLoader from '../utils/lazy-image-loader';

/**
 * LazyImageMixin
 * Mixin for Images to use a LazyImageLoader to manage when
 * they should load their src.
 */
var LazyImageMixin = Ember.Mixin.create({
  attributeBindings: ['url:data-src'],
  canLazyLoad: false,

  // Override these methods to queue if not in view
  loadImageOnInsert: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, this._loadOrQueue);
  }),

  loadImageOnSrcChange: Ember.observer('url', function() {
    this.set('canLazyLoad', false);
    Ember.run.scheduleOnce('afterRender', this, this._loadOrQueue);
  }),

  _loadImageLazy: Ember.observer('canLazyLoad', function() {
    if (this.get('canLazyLoad')) {
      Ember.run.scheduleOnce('afterRender', this, this.loadImage);
      this.constructor.lazyLoader.dequeueView(this);
      this.get('element').removeAttribute('data-src');
    }
  }),

  _loadOrQueue: function() {
    var lazyLoader = this.constructor.lazyLoader;
    var isCurrentlyInView = lazyLoader.checkIfInView(this.get('element'));
    if (isCurrentlyInView) {
      this.set('canLazyLoad', true);
    } else {
      this.queueId = lazyLoader.queueView(this);
    }
  },

  _dequeueOnDestroy: Ember.on('willDestroyElement', function() {
    this.constructor.lazyLoader.dequeueView(this);
  })
});

export default LazyImageMixin;
