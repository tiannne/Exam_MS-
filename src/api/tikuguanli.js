import instance from '../utils/createaxios'

export const tikuguanli = (current, size, params, t) => {
  return instance({
    url: "/exam/api/repo/paging",
    method: "POST",
    data: {
      current,
      size,
      params,
      t,
    },
  });
};

export const add = (remark, title) => {
  return instance({
    url: "/exam/api/repo/save",
    method: "POST",
    data: {
      remark,
      title,
    },
  });
};


export const dele = (ids) => {
  return instance({
    url: "/exam/api/repo/delete",
    method: "POST",
    data: {
      ids
    },
  });
};