/* global modules:false */

modules.define(
    'youtube',
    ['i-bem__dom', 'BEMHTML', 'jquery', 'loader_type_js'],
    function(provide, BEMDOM, BEMHTML, $, loader) {

    provide(BEMDOM.decl(this.name, {
        onSetMod : {
            js : {
                'inited' : function() {
                    var _this = this;
                    this._player;
                    this._apiUrl = 'https://www.youtube.com/iframe_api';
                    this._videoId = this._getVideoId(this.params.videoId || '');
                    this._width = this.params.width || '560';
                    this._height = this.params.height || '315';
                    this._playerVars = this.params.playerVars || {};
                    this._button = this.params.button || false;
                    this._buttonSize = this.params.buttonSize || 'l';

                    BEMDOM.append(
                        this.domElem,
                        BEMHTML.apply({ block : 'youtube', elem : 'player' })
                    );

                    loader(this._apiUrl, function() {
                        // window.onYouTubeIframeAPIReady isn't needed

                        if (_this.params.loadOnDemand) {
                            _this._createThumbnail();

                            _this.bindTo('thumbnail', 'click', function(e) {
                                _this._playerVars.autoplay = true;
                                _this._createPlayer();
                                BEMDOM.destruct(this.elem('thumbnail'));
                            });
                        } else {
                            _this._createPlayer();
                        }

                        if (_this.params.fluid) {
                            _this._makeFluid();
                        } else {
                            _this.domElem.css({
                                position : 'relative',
                                width : _this._width,
                                height : _this._height
                            });
                        }
                    });
                }
            }
        },
        _getVideoId : function(input) {
            // if input is really videoId
            if (input.length === 11) return input;

            // if input is value of src attr in iframe
            if (/^<iframe/.test(input)) {
                var regEx = /(src)=["']([^"']*)["']/;
                input = input.match(regEx)[2];
            }

            var regEx = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = input.match(regEx);

            if (match && match[7].length === 11) {
                return match[7];
            } else {
                console.log('YouTube url is incorrect!');
            }
        },
        _createThumbnail : function() {
            // TODO: support WebP
            var thumbStyles = 'background-image: url("' + 'https://i.ytimg.com/vi/' + this._videoId + '/0.jpg")';
            var _this = this;

            BEMDOM.append(
                this.domElem,
                BEMHTML.apply({
                    block : 'youtube',
                    elem : 'thumbnail',
                    attrs : { style : thumbStyles },
                    content : _this._getButtonTpl()
                })
            );
        },
        _getButtonTpl : function() {
            if (this._button) {
                return {
                    block : 'youtube-button',
                    mods : { theme : 'custom', size : this._buttonSize },
                    content : this._button
                };
            } else {
                return {
                    // update default sizes
                    block : 'youtube-button',
                    mods : { theme : 'default', size : 'l' },
                    content : [
                        '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">',
                            '<path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.9"></path>',
                            '<path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"></path>',
                            '<path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"></path>',
                        '</svg>'
                    ]
                };
            }
        },
        _createPlayer : function() {
            this._player = new YT.Player(this.elem('player')[0], {
                width : this._width,
                height : this._height,
                videoId : this._videoId,
                playerVars : this._playerVars,
                events : {}
            });
        },
        _makeFluid : function() {
            var _this = this;
            if (this._width === '100%') this._width = $(this.domElem).parent().width();
            if (this._height === '100%') this._height = $(this.domElem).parent().height();

            var videoRatio = (this._height / this._width) * 100;

            this.domElem.css({
                position : 'relative',
                width : this._width,
                'padding-top' : videoRatio + '%'
            });

            this.findElem('player').css({
                position : 'absolute',
                top : 0,
                left: 0,
                width : '100%',
                height : '100%'
            });

        }
    }));

});