export default [
    {
        path: '/docs',
        name:'document',
        component: ()=>import('@/views/Document/Document.vue'),
        meta:{
            app_view_usePaddingTop: true,
            app_view_useFullScreen: true,
        },
        children: [
            {
                path: 'test',
                name: 'docs_test',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'test.{lang}.md'
                }
            }
        ],
    }
];