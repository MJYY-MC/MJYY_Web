export type DocList={
    key: string,
    sub: {
        name: string,
    }[],
}[];
export default [
    {
        key: 'faq',
        sub:[
            {
                name: 'docs_faq',
            },
            {
                name: 'docs_web_gamemap',
            }
        ],
    },
    {
        key:'join',
        sub:[
            {
                name: 'docs_game',
            },
            {
                name: 'docs_access',
            },
        ],
    },
    {
        key: 'ingame',
        sub:[
            {
                name: 'docs_menu',
            },
        ],
    },
    {
        key:'world',
        sub:[
            {
                name: 'docs_world',
            },
            {
                name: 'docs_overworld',
            },
            {
                name: 'docs_freeWorld',
            },
            {
                name: 'docs_landOfChaos',
            },
            {
                name: 'docs_backroom',
            },
            {
                name: 'docs_funWorld',
            },
        ],
    },
] as DocList;