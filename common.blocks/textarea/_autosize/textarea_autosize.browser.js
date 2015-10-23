/* global modules:false */

modules.define('textarea',
    ['i-bem__dom', 'autosize'],
    function(provide, BEMDOM, autosize) {

provide(BEMDOM.decl({ block : this.name, modName : 'autosize', modVal : true }, {
    onSetMod : {
        'js' : {
           'inited' : function() {
                this.__base.apply(this, arguments);

                autosize(this.domElem);
            }
        }
    }
}));

});
