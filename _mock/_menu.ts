import { MockRequest } from '@delon/mock';

const data = [];

data.push({
  id: 1,
  menuCode: '0',
  menuName: 'root',
  moduleName: '',
  href: '',
  isVisible: '0',
  parentCode: ''
});

for(let i = 0; i < 2; i++) {
  let node = {
    id: data.length + 1,
    menuCode: '0' + (i+1),
    menuName: 'menu_0' + (i+1),
    moduleName: 'sys',
    href: '',
    isVisible: '0',
    parentCode: '0'
  };
  data.push(node);
  for(let j = 0; j < 2; j++) {
    let child = {
      id: data.length + 1,
      menuCode: node.menuCode + '0' + (j+1),
      menuName: 'menu_' + node.menuCode + '0' + (j+1),
      moduleName: 'sys',
      href: '#',
      isVisible: '0',
      parentCode: node.menuCode
    };
    data.push(child);
  }
}

function genTree(menuCode: string) {
  let nodes = [...data];
  let node = nodes.find(w => w.menuCode === menuCode);
  let children = nodes.filter(w => (w.parentCode === menuCode && w.isVisible !== '1'));
  if(children !== undefined) {
    node.children = [...children];
    node.children.forEach((item: any) => genTree(item.menuCode));
  }
  return node;
}

function genData(menuCode:string, params?: any) {
  let tree = genTree(menuCode);
  return {  msg: 'ok', list: tree };
}

function saveData(value: any) {
  let ran_id = data.length + 1;
  const item = {
    id: ran_id,
  };
  Object.assign(item, value);
  data.push(item);
  return { msg: 'ok', data: item };
}

function updateData(menuCode: string, value: any) {
  const item = data.find(w => w.menuCode === menuCode);
  if (!item) return { msg: '无效信息' };
  Object.assign(item, value);
  return { msg: 'ok', data: item };
}

function deleteData(menuCode: string) {
  data.filter((w, index) => {
    if(w.parentCode === menuCode) data.splice(index, 1);
  });
  const item = data.find(w => w.menuCode === menuCode);
  const index = data.findIndex(w => w.menuCode === menuCode);
  if (index === -1) return { msg: '无效信息' };
  data.splice(index, 1);
  return { msg: 'ok', data: item };
}

export const MENU = {
  'GET /sys/menu': (req: MockRequest) => genData('0', req.queryString),
  'GET /sys/menu/:menuCode': (req: MockRequest) => data.find(w => w.menuCode === req.params.menuCode),
  'GET /sys/menu/:menuCode/children': (req: MockRequest) => genData(req.params.menuCode, req.queryString),
  'POST /sys/menu': (req: MockRequest) => saveData(req.body),
  'PUT /sys/menu/:menuCode': (req: MockRequest) => updateData(req.params.menuCode, req.body),
  'DELETE /sys/menu/:menuCode': (req: MockRequest) => deleteData(req.params.menuCode),
}