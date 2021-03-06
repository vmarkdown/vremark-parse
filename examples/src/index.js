const unified = require('unified');
// const md = require('../md/test.md');
const Vue = require('vue').default;

// const plugins = require('../../packages/vrehype-plugins');
// const vdom = require('../../packages/rehype-vdom');

Vue.component('my-component', {
    props: {
        code: String
    },
    render(h) {
        console.log('render');
        // console.log('code', this.code);
        // return h('div',{ },'my-component==='+ (new Date().getTime()) );


        return h('div',{ }, this.code );


    }
});


// (function () {
//
//
//     const app = new Vue({
//         el: '#app',
//         render(h) {
//             return h('p', {}, [
//
//                 h('h1', {}, 'h1'+ (new Date().getTime())),
//
//                 h('my-component', {
//                     props: {
//                         code: '1111'
//                     }
//                 })
//
//             ]);
//         }
//     });
//
//     setTimeout(function () {
//         console.log('update');
//         app.$forceUpdate();
//     }, 3000);
//
//     setTimeout(function () {
//         console.log('update');
//         app.$forceUpdate();
//     }, 7000);
//
// })();

function loader(names) {

    var plugins = [
        require('./plugins/vremark-plugin-math'),
        require('./plugins/vremark-plugin-highlight')
    ];
    return plugins;
}

const vremark = {
    async parse(md, options) {
        const parse = require('../../index');
        const stringify = require('../../packages/vremark-stringify');
        const processor = unified().use(parse).use(stringify).data('settings', options);
        const file = await processor.process(md);
        return file.contents;

    },
    async render(hast, options) {
        const render = require('vremark-render');
        const processor = unified().use(render).data('settings', options);
        const file = await processor.process(hast);

        return file.contents;

    }
};

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const h = this.$createElement;

            const hast = await vremark.parse(md, {
                config: {
                    root: {
                        tagName: 'main',
                        class: 'markdown-body'
                    }
                }
            });

            console.log(hast);

            const vdom = await vremark.render(hast, {
                h:h
            });

            console.log(vdom);

            this.vdom = vdom;

            this.$forceUpdate();

            // console.time('process');
            // const processor = unified().use(parse).use(plugins).use(vdom).data('settings', {
            //     config: {
            //         root: {
            //             tagName: 'main',
            //             class: 'markdown-body'
            //         }
            //     },
            //     Vue: Vue,
            //     h:h,
            //     loader: loader
            // });
            // const file = await processor.process(md);
            // console.timeEnd('process');
            // this.vdom = file.contents;
            //
            // console.log(file.mdast);
            // console.log(file.hast);
            // console.log(this.vdom);


            // visit(file.hast, function (node) {
            //     return node.type === 'element' && node.tagName === 'input';
            // }, function (node) {
            //    var position = node.position;
            //    console.log(md.substring(position.start.offset, position.end.offset))
            // });

            // this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

(async ()=>{

    setTimeout(function () {
        app.update(require('../md/1.md'));
    }, 0);

    // setTimeout(function () {
    //     document.querySelector('.vremark-root').style.backgroundColor="red";
    //     app.update(require('../md/2.md'));
    // }, 5000);

    // setTimeout(function () {
    //     // document.querySelector('.vremark-root').style.backgroundColor="red";
    //     app.update(require('../md/2.md'));
    // }, 5000);






















    // const mdast = processor.parse(md);
    // console.log(mdast);
    // const hast = await processor.run(mdast);
    // console.log(hast);
    // app.update(hast);

    // const file = await processor.process(md);
    // debugger
    // const hast = file.contents;
    // app.update(hast);

    // app.update(md);


    // setTimeout(function () {
    //     app.refresh0();
    // }, 3000);
    // setTimeout(function () {
    //     app.refresh1();
    // }, 7000);




    // setTimeout(function () {
    //     var dom = app.$refs['41243535'];
    //
    //     console.log(dom);
    //
    //     dom.style.backgroundColor = '#38323261';
    // }, 1000);
    // setTimeout(function () {
    //     app.update(require('../md/test.md'));
    // }, 3000);




    // setTimeout(function () {
    //     app.update(md.replace('Markdown简介','====='));
    // }, 5000);

    // setTimeout(function () {
    //     app.update(require('../md/test1.md'));
    // }, 5000);


})();


