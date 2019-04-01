import { MockRequest } from '@delon/mock';

const list = [
  {
    id     : 1,
    menuName    : '系统管理',
    moduleName: 'sys',
    href : '',
    isVisible: '1',
    children: [
      {
        id    : 11,
        menuName   : '系统设置',
        moduleName    : 'sys',
        href: '',
        isVisible: '1',
        children: [
          {id: 111, menuName: '模块管理', moduleName: 'sys', href: '/sys/module', isVisible: '1', children: []},
          {id: 112, menuName: '菜单管理', moduleName: 'sys', href: '/sys/menu', isVisible: '1', children: []}
        ]
      },
      {
          id    : 12,
          menuName   : '组织管理',
          moduleName    : 'sys',
          href: '',
          isVisible: '1',
          children: [
            {id: 121, menuName: '模块管理', moduleName: 'sys', href: '/sys/module', isVisible: '1', children: []},
            {id: 122, menuName: '菜单管理', moduleName: 'sys', href: '/sys/menu', isVisible: '1', children: []}
          ]
      }
    ]
  },
  {
      id    : 2,
      menuName   : '流程管理',
      moduleName    : 'flow',
      href: '',
      isVisible: '1',
      children: []
  }
];

function genData(params: any) {
  let ret = [...list];
  const pi = +params.pi,
    ps = +params.ps,
    start = (pi - 1) * ps;

  return {  msg: 'ok', list: ret };
}

function saveData(value: any) {
  return { msg: 'ok'};
}

function updateData(id: number, value: any) {
  return { msg: 'ok'};
}

function deleteData(id: number) {
  
  return { msg: 'ok'};
}

function getChildren(id: number, params: any) {
  let ret = [...list];
  // if( id !== 0 ) {
  //   let parent = ret.find(w => w.id === +id);  
  //   ret = [...parent.children];
  // } 
  console.log(ret);
  return { msg: 'ok', list: ret };
}

export const MENU = {
  'GET /sys/menu': (req: MockRequest) => genData(req.queryString),
  'GET /sys/menu/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'GET /sys/menu/:id/children': (req: MockRequest) => getChildren(req.params.id, req.queryString),
  // 'POST /sys/menu': (req: MockRequest) => saveData(req.body),
  // 'PUT /sys/menu/:id': (req: MockRequest) => updateData(+req.params.id, req.body),
  // 'DELETE /sys/menu/:id': (req: MockRequest) => deleteData(+req.params.id),
}