var renderer = require('./renderer');
// var data = require('./data');

function Parser(options) {
    this.options = options || {};
    this.h = this.options.h || function (tagName, properties, value) {
        return value;
    };
    this.renderer = Object.assign(renderer, this.options.renderer || {});
}

Parser.prototype.parseNodes = function(nodes, parent) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        // node.index = i;
        node.parent = parent;
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node) {
    if(!node) return null;
    var children = this.parseNodes(node.children, node);
    var h = this.h;
    if(!this.renderer[node.type]){
        // throw new Error('renderer:'+node.type+' not found!');
        console.error('renderer:'+node.type+' not found!');
        return null;
    }
    // const _data = data(node, this.options);
    // return this.renderer[node.type].apply(null, [h, node, _data, children, this.options]);
    return this.renderer[node.type].apply(null, [h, node, node.data || {}, children, this.options]);
};

Parser.prototype.parse = function(root) {
    try {
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;