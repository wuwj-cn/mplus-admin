import { MockRequest } from '@delon/mock';

const list = [];
const total = 10;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    userId: i + 1,
    nickName: 'user_' + i,
    userName: 'user_' + i,
    orgCode: '0101',
    orgName: 'org_0101',
    email: '123@qq.com',
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

  if (params.userId) {
    ret = ret.filter(data => data.userId.indexOf(params.userId) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(value: any) {
  let ran_id = list.length + 1;
  const item = {
    id: ran_id,
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

export const USERS = {
  'GET /sys/user': (req: MockRequest) => genData(req.queryString),
  'GET /sys/user/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /sys/user': (req: MockRequest) => saveData(req.body),
  'PUT /sys/user/:id': (req: MockRequest) => updateData(+req.params.id, req.body),
  '/user/current': {
    name: 'Cipchk',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'cipchk@qq.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注撩妹',
      },
      {
        key: '2',
        label: '帅~',
      },
      {
        key: '3',
        label: '通吃',
      },
      {
        key: '4',
        label: '专职后端',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '上海',
        key: '330000',
      },
      city: {
        label: '市辖区',
        key: '330100',
      },
    },
    address: 'XX区XXX路 XX 号',
    phone: '你猜-你猜你猜猜猜',
  },
  'POST /user/avatar': 'ok',
  'POST /login/account': (req: MockRequest) => {
    const data = req.body;
    if (
      !(data.userName === 'admin' || data.userName === 'user') ||
      data.password !== 'ng-alain.com'
    ) {
      return { msg: `Invalid username or password（admin/ng-alain.com）` };
    }
    return {
      msg: 'ok',
      user: {
        token: '123456789',
        name: data.userName,
        email: `${data.userName}@qq.com`,
        id: 10000,
        time: +new Date(),
      },
    };
  },
  'POST /register': {
    msg: 'ok',
  },
};
