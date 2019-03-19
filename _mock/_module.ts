import { MockRequest } from '@delon/mock';

const list = [];
const total = 50;

for (let i = 0; i < total; i++) {
    list.push({
      id: i + 1,
      moduleName: 'module_' + (i + 1),
      moduleCode: 'module_' + (i + 1),
      desc: 'this is a module description...',
      version: '1.0',
      status: Math.floor(Math.random() * 10) % 3,
      updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    });
  }
  
  function genData(params: any) {
    let ret = [...list];
    const pi = +params.pi,
      ps = +params.ps,
      start = (pi - 1) * ps;
  
    if (params.moduleName) {
      ret = ret.filter(data => data.moduleName.indexOf(params.moduleName) > -1);
    }

    if (params.moduleCode) {
      ret = ret.filter(data => data.moduleCode.indexOf(params.moduleCode) > -1);
    }

    if (params.status != undefined) {
      ret = ret.filter(data => data.status === params.status);
    }
  
    return { total: ret.length, list: ret.slice(start, ps * pi) };
  }

  function saveData(value: any) {
    let ran_id = list.length + 1;
    const item = {
      id: ran_id,
      updatedAt: new Date(`2017-07-${Math.floor(ran_id / 2) + 1}`),
      createdAt: new Date(`2017-07-${Math.floor(ran_id / 2) + 1}`),
    };
    Object.assign(item, value);
    list.push(item);
    return { msg: 'ok', data: item };
  }
  
  function updateData(id: number, value: any) {
    const item = list.find(w => w.id === id);
    if (!item) return { msg: '无效用户信息' };
    Object.assign(item, value);
    return { msg: 'ok', data: item };
  }

  function deleteData(id: number) {
    const item = list.find(w => w.id === id);
    const index = list.findIndex(w => w.id === id);
    if (index === -1) return { msg: '无效用户信息' };
    list.splice(index, 1);
    return { msg: 'ok', data: item };
  }

export const MODULES = {
  'GET /sys/module': (req: MockRequest) => genData(req.queryString),
  'GET /sys/module/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /sys/module': (req: MockRequest) => saveData(req.body),
  'PUT /sys/module/:id': (req: MockRequest) => updateData(+req.params.id, req.body),
  'DELETE /sys/module/:id': (req: MockRequest) => deleteData(+req.params.id),
}