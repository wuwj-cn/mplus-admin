import { MockRequest } from '@delon/mock';

const list = [];
const total = 50;

for (let i = 0; i < total; i++) {
    list.push({
      id: i + 1,
      postName: 'post_' + (i + 1),
      postCode: 'post_' + (i + 1),
      postType: Math.floor(Math.random() * 10) % 3,
      status: Math.floor(Math.random() * 10) % 3
    });
  }
  
  function genData(params: any) {
    let ret = [...list];
    const pi = +params.pi,
      ps = +params.ps,
      start = (pi - 1) * ps;
  
    if (params.postName) {
      ret = ret.filter(data => data.postName.indexOf(params.postName) > -1);
    }

    if (params.postCode) {
      ret = ret.filter(data => data.postCode.indexOf(params.postCode) > -1);
    }

    if (params.status != undefined) {
      ret = ret.filter(data => data.status === params.status);
    }
    return { total: ret.length, list: !pi? ret : ret.slice(start, ps * pi) };
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
  
  function updateData(postCode: string, value: any) {
    const item = list.find(w => w.postCode === postCode);
    if (!item) return { msg: '无效用户信息' };
    Object.assign(item, value);
    return { msg: 'ok', data: item };
  }

  function deleteData(postCode: string) {
    const item = list.find(w => w.postCode === postCode);
    const index = list.findIndex(w => w.postCode === postCode);
    if (index === -1) return { msg: '无效用户信息' };
    list.splice(index, 1);
    return { msg: 'ok', data: item };
  }

export const POST = {
  'GET /sys/post': (req: MockRequest) => genData(req.queryString),
  'GET /sys/post/:postCode': (req: MockRequest) => list.find(w => w.postCode === +req.params.postCode),
  'POST /sys/post': (req: MockRequest) => saveData(req.body),
  'PUT /sys/post/:postCode': (req: MockRequest) => updateData(req.params.postCode, req.body),
  'DELETE /sys/post/:postCode': (req: MockRequest) => deleteData(req.params.postCode),
}