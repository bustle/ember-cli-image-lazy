import BackgroundImage from 'ember-cli-image/components/background-image';
import XImg from 'ember-cli-image/components/x-img';

import LazyImageLoader from 'ember-cli-image-lazy/utils/lazy-image-loader';
import LazyImageMixin from 'ember-cli-image-lazy/mixins/lazy-image-mixin';

export function initialize() {
  var defaultLazyLoader = new LazyImageLoader();

  BackgroundImage.reopenClass({ lazyLoader: defaultLazyLoader });
  BackgroundImage.reopen( LazyImageMixin, {
    style: Ember.computed('url', 'canLazyLoad', function() {
      if(this.get('canLazyLoad')) {
        return this._super();
      }
    })
  });

  XImg.reopenClass({ lazyLoader: defaultLazyLoader });
  XImg.reopen( LazyImageMixin );

}

export default {
  name: 'image-lazy',
  initialize: initialize
};
