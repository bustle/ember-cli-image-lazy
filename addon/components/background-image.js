import Ember from 'ember';
import BackgroundImage from 'ember-cli-image/components/background-image';
import LazyImageLoader from '../utils/lazy-image-loader';

var defaultLazyLoader = new LazyImageLoader();
BackgroundImage.reopenClass({ lazyLoader: defaultLazyLoader });
BackgroundImage.reopen( LazyImageViewMixin, {
  style: Ember.computed('url', 'canLazyLoad', function() {
    if(this.get('canLazyLoad')) {
      return this._super();
    }
  })
});

export default BackgroundImage;