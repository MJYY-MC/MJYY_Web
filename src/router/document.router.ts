export default [
    {
        path: '/docs',
        name:'document',
        component: ()=>import('@/views/Document/Document.vue'),
        meta:{
            app_view_usePaddingTop: true,
            app_view_useFullScreen: true,

            doc_mdFileRelativePath: 'home.{lang}.md',
        },
        children: [
            {
                path: 'test',
                name: 'docs_test',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'test.{lang}.md'
                }
            },
            {
                path: 'join/access',
                name: 'docs_access',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'join_access.{lang}.md'
                }
            },
            {
                path: 'join/game',
                name: 'docs_game',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'join_game.{lang}.md'
                }
            },
            {
                path: 'ingame/menu',
                name: 'docs_menu',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'ingame_menu.{lang}.md'
                }
            },
            {
                path: 'faq',
                name: 'docs_faq',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'faq.{lang}.md'
                }
            },
            {
                path: 'world',
                name: 'docs_world',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'world.{lang}.md'
                }
            },
            {
                path: 'world/overworld',
                name: 'docs_overworld',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'world_overworld.{lang}.md'
                }
            },
            {
                path: 'world/freeworld',
                name: 'docs_freeWorld',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'world_freeWorld.{lang}.md'
                }
            },
            {
                path: 'world/landofchaos',
                name: 'docs_landOfChaos',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'world_landOfChaos.{lang}.md'
                }
            },
            {
                path: 'world/backroom',
                name: 'docs_backroom',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'world_backroom.{lang}.md'
                }
            },
            {
                path: 'world/funworld',
                name: 'docs_funWorld',
                component: ()=>import('@/views/Document/Document.vue'),
                meta:{
                    doc_mdFileRelativePath: 'world_funWorld.{lang}.md'
                }
            },
        ],
    }
];