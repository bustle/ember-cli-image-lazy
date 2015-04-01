import Ember from 'ember';
import LazyImageLoader from '../utils/lazy-image-loader';

/**
 * LazyImageViewMixin
 * Mixin for ImageViews to use a LazyImageLoader to manage when
 * they should load their src.
 */
var LazyImageViewMixin = Ember.Mixin.create({
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

// Create a default LazyImageLoader.
// To customize per application, create one and reopenClass on image views
var defaultLazyLoader = new LazyImageLoader();
Ember.ImageView.reopenClass({ lazyLoader: defaultLazyLoader });
Ember.BackgroundImageView.reopenClass({ lazyLoader: defaultLazyLoader });

// Apply the Mixin to ImageViews instances to make them lazy
Ember.ImageView.reopen( LazyImageViewMixin );
Ember.BackgroundImageView.reopen( LazyImageViewMixin, {
  style: Ember.computed('url', 'canLazyLoad', function() {
    if(this.get('canLazyLoad')) {
      return this._super();
    }
  })
});
