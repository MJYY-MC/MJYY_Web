import codeMode from "@/ts/env/codeMode.ts";

export default [
    {
        path: '/game',
        name: 'game',
        component: ()=>import('@/views/Game/Game.vue'),
        meta:{
            app_view_usePaddingTop: true,
        },
    },
    {
        path: '/game/fiar',
        name: 'game_fiar',
        component: () => import('@/views/ReuseParentSubPage.vue'),
        meta:{
            route_reloadKey: "game_fiar",

            app_view_usePaddingTop: true,
            app_view_useFullScreen: true,

            authSubPage_targetUrlPath: '/gateway/post/game_fiar',
            authSubPage_savePassword:{
                cookie: {
                    path: '/game/fiar',
                    name: 'game_fiar'
                }
            },
            localePrefix: 'view_rpsp_game_fiar',
        }
    },
    {
      path: '/game/defender',
      name: 'game_defender',
      component: () => import('@/views/gameView/gameView.vue'),
      meta:{
          //为view添加顶部内边距，防止导航栏遮挡
          app_view_usePaddingTop: true,
          //将view大小固定为全屏
          app_view_useFullScreen: true,

          game_htmlPath:
              (codeMode=='cf')
              ?[//cf不支持超过25M的单个文件，所以只能使用github page的地址
                      'https://web.mjyy.top/mjyy-web-game_defender/mjyy-web-game_defender.html',
                      'https://bak.mjyy.top/gameFiles/defender/mjyy-web-game_defender.html',
                  ]
              :[
                      'https://web.mjyy.top/mjyy-web-game_defender/mjyy-web-game_defender.html',
                      '/gameFiles/defender/mjyy-web-game_defender.html',
                  ],
      },
    },
];