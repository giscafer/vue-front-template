import Mock from 'mockjs';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      createTime: +Mock.Random.date('T'),
      account: '@first',
      companyName: '@title(5, 10)',
      accessKey: '@first',
      secret: '@first',
      'status|1': ['freeze', 'unfreeze']
    })
  );
}

export default [
  {
    url: '/vue-admin-template/user/list',
    type: 'get',
    response: config => {
      const { account, page = 1, size = 10, sort } = config.query;

      let mockList = List.filter(item => {
        if (account && item.account !== account) return false;
        return true;
      });

      if (sort === '-id') {
        mockList = mockList.reverse();
      }

      const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1));

      return {
        code: 2000,
        desc: '查询成功',
        data: pageList,
        pageInfo: {
          totalSize: mockList.length,
          totalPages: Math.ceil(mockList.length / 10),
          size: size,
          first: true,
          last: false,
          number: size * page + size
        }
      };
    }
  },

  {
    url: '/vue-admin-template/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 2000,
            data: article
          };
        }
      }
    }
  },

  {
    url: '/vue-admin-template/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 2000,
        data: 'success'
      };
    }
  },

  {
    url: '/vue-admin-template/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 2000,
        data: 'success'
      };
    }
  }
];
