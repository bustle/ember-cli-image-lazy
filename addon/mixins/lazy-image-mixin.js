import Ember from 'ember';
import InViewportMixin from './in-viewport';

/**
 * A mixin for Ember image views to load them only 
 * when they are scrolled into the viewport.
 * @class LazyImageViewMixin
 * @uses InViewportMixin
 */
export default Ember.Mixin.create( InViewportMixin, {
  /**
   * @override
  */
  loadImageOnInsert: null,

  /**
   * @private
  */
  _loadImageOnEnterView: Ember.observer('didEnterViewport', function() {
    if (this.get('didEnterViewport')) {
      Ember.run.scheduleOnce('afterRender', this, this.loadImage);
    }
  })
});
