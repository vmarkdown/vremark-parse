var visit = require('unist-util-visit');
var toc = require('./mdast-util-toc');
var data = require('../unist-util-data');

function create(root) {
    var result = toc(root);
    return result.map;
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        var tocCache = null;

        visit(root, function (node) {
            return node.type === 'linkReference'
                && (node.label === 'TOC' || node.label === 'toc')
                && node.identifier === "toc";
        }, function (node) {
            tocCache = tocCache?tocCache:create(root);
            if(tocCache) {
                Object.assign(node, tocCache);
            }
            else{
                Object.assign(node, {
                    type: 'text',
                    value: ''
                });
            }
        });

        tocCache && visit(root, 'heading', function (node) {
            if(node.__id__){
                data(node, {
                    attrs: {
                        id: node.__id__
                    }
                });
                delete node.__id__;
            }
        });

        return root;
    }
};