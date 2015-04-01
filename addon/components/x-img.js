import Ember from 'ember';
import XImg from 'ember-cli-image/components/x-img';
import LazyImageLoader from '../utils/lazy-image-loader';

var defaultLazyLoader = new LazyImageLoader();
XImg.reopenClass({ lazyLoader: defaultLazyLoader });
XImg.reopen( LazyImageViewMixin );

export default XImg;
