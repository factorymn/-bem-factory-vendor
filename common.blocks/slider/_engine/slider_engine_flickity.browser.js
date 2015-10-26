/* global modules:false */

modules.define(
    'slider',
    ['i-bem__dom', 'flickity'],
    function(provide, BEMDOM, Flickity) {

provide(BEMDOM.decl({ block : this.name, modName : 'engine', modVal : 'flickity' }, {
    onSetMod : {
        'js' : {
           'inited' : function() {
                this.init();
           }
        }
    },
    init : function() {
        var _this = this;
        var params = this.params;
        var defaultParams = {};

        for (var prop in params) {
            if (prop != 'uniqId') {
                defaultParams[prop] = params[prop];
            }
        }

        return new Flickity(this.elem('list'), defaultParams);
    }
}));

});