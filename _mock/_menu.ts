import { MockRequest } from '@delon/mock';

const list = [
    {
      key     : 1,
      menuName    : '系统管理',
      moduleName: 'sys',
      url : '',
      isVisible: '1',
      children: [
        {
          key    : 11,
          menuName   : '系统设置',
          moduleName    : 'sys',
          url: '',
          isVisible: '1',
          children: [
            {key: 111, menuName: '模块管理', moduleName: 'sys', url: '/sys/module', isVisible: '1'},
            {key: 112, menuName: '菜单管理', moduleName: 'sys', url: '/sys/menu', isVisible: '1'}
          ]
        },
        {
            key    : 12,
            menuName   : '组织管理',
            moduleName    : 'sys',
            url: '',
            isVisible: '1',
            children: [
              {key: 121, menuName: '模块管理', moduleName: 'sys', url: '/sys/module', isVisible: '1'},
              {key: 122, menuName: '菜单管理', moduleName: 'sys', url: '/sys/menu', isVisible: '1'}
            ]
        }
      ]
    },
    {
        key    : 2,
        menuName   : '流程管理',
        moduleName    : 'flow',
        url: '',
        isVisible: '1'
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

export const MENU = {
  'GET /sys/menu': (req: MockRequest) => genData(req.queryString),
  // 'GET /sys/menu/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  // 'POST /sys/menu': (req: MockRequest) => saveData(req.body),
  // 'PUT /sys/menu/:id': (req: MockRequest) => updateData(+req.params.id, req.body),
  // 'DELETE /sys/menu/:id': (req: MockRequest) => deleteData(+req.params.id),
}