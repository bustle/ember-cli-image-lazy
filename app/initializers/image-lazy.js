import ImgComponent from 'ember-cli-image/components/img-component';
import BackgroundImageComponent from 'ember-cli-image/components/background-image-component';
import LazyImageMixin from 'ember-cli-image-lazy/mixins/lazy-image-mixin';

export function initialize() {

  var hasDOM = typeof document !== 'undefined';

  if (typeof ImgComponent.enableLazyLoading === 'undefined') {
    ImgComponent.reopenClass({
      enableLazyLoading: hasDOM
    });
  }
  if (typeof BackgroundImageComponent.enableLazyLoading === 'undefined') {
    BackgroundImageComponent.reopenClass({
      enableLazyLoading: hasDOM
    });
  }

  if (ImgComponent.enableLazyLoading) {
    ImgComponent.reopen( LazyImageMixin );
  }
  if (BackgroundImageComponent.enableLazyLoading) {
    BackgroundImageComponent.reopen( LazyImageMixin );
  }

}

export default {
  name: 'image-lazy',
  initialize: initialize
};
