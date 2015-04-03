import ImgComponent from 'ember-cli-image/components/x-img';
import BackgroundImageComponent from 'ember-cli-image/components/background-image';
import LazyImageMixin from 'ember-cli-image-lazy/mixins/lazy-image-mixin';

export function initialize() {
  if (typeof document !== 'undefined') {
    ImgComponent.reopen( LazyImageMixin );
    BackgroundImageComponent.reopen( LazyImageMixin );
  }
}

export default {
  name: 'image-lazy',
  initialize: initialize
};
