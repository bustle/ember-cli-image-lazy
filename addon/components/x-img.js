import Ember from 'ember';
import XImg from 'ember-cli-image/components/x-img';
import LazyImageLoader from '../utils/lazy-image-loader';
import LazyImageMixin from '../mixins/lazy-image-mixin';

var defaultLazyLoader = new LazyImageLoader();
XImg.reopenClass({ lazyLoader: defaultLazyLoader });
XImg.reopen( LazyImageMixin );

export default XImg;
