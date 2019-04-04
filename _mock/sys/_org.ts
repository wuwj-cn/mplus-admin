import { MockRequest } from '@delon/mock';

const data = [];

data.push({
  id: 1,
  orgCode: '0',
  orgName: 'root',
  fullName: 'root',
  status: '0',
  parentCode: ''
});

for(let i = 0; i < 2; i++) {
  let node = {
    id: data.length + 1,
    orgCode: '0' + (i+1),
    orgName: 'org_0' + (i+1),
    fullName: 'org_0' + (i+1),
    status: '0',
    parentCode: '0'
  };
  data.push(node);
  for(let j = 0; j < 2; j++) {
    let child = {
      id: data.length + 1,
      orgCode: node.orgCode + '0' + (j+1),
      orgName: 'org_' + node.orgCode + '0' + (j+1),
      fullName: 'org_' + node.orgCode + '0' + (j+1),
      status: '0',
      parentCode: node.orgCode
    };
    data.push(child);
  }
}

function genTree(orgCode: string) {
  let nodes = [...data];
  let node = nodes.find(w => w.orgCode === orgCode);
  let children = nodes.filter(w => (w.parentCode === orgCode));
  if(children !== undefined) {
    node.children = [...children];
    node.children.forEach((item: any) => genTree(item.orgCode));
  }
  return node;
}

function genData(orgCode:string, params?: any) {
  let tree = genTree(orgCode);
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

function updateData(orgCode: string, value: any) {
  const item = data.find(w => w.orgCode === orgCode);
  if (!item) return { msg: '无效信息' };
  Object.assign(item, value);
  return { msg: 'ok', data: item };
}

function deleteData(orgCode: string) {
  data.filter((w, index) => {
    if(w.parentCode === orgCode) data.splice(index, 1);
  });
  const item = data.find(w => w.orgCode === orgCode);
  const index = data.findIndex(w => w.orgCode === orgCode);
  if (index === -1) return { msg: '无效信息' };
  data.splice(index, 1);
  return { msg: 'ok', data: item };
}

export const ORG = {
  'GET /sys/org': (req: MockRequest) => genData('0', req.queryString),
  'GET /sys/org/:orgCode': (req: MockRequest) => data.find(w => w.orgCode === req.params.orgCode),
  'GET /sys/org/:orgCode/children': (req: MockRequest) => genData(req.params.orgCode, req.queryString),
  'POST /sys/org': (req: MockRequest) => saveData(req.body),
  'PUT /sys/org/:orgCode': (req: MockRequest) => updateData(req.params.orgCode, req.body),
  'DELETE /sys/org/:orgCode': (req: MockRequest) => deleteData(req.params.orgCode),
}