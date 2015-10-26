/* global modules:false */

modules.define(
    'slider',
    ['i-bem__dom', 'jquery', 'slick'],
    function(provide, BEMDOM, $, slick) {

provide(BEMDOM.decl({ block : this.name, modName : 'engine', modVal : 'slick' }, {
    onSetMod : {
        'js' : {
           'inited' : function() {
                this.init();
           }
        }
    },
    init : function() {
        var params = this.params;
        var defaultParams = {};

        for (var prop in params) {
            if (prop != 'uniqId') {
                defaultParams[prop] = params[prop];
            }
        }
        this.elem('list').slick(defaultParams);
    }
}));

});