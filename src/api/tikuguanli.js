import instance from "../utils/createaxios";

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

export const add = (title, remark) => {
  return instance({
    url: "/exam/api/repo/save",
    method: "POST",
    data: {
      title,
      remark
    },
  });
};

export const dele = (ids) => {
  return instance({
    url: "/exam/api/repo/delete",
    method: "POST",
    data: {
      ids,
    },
  });
};

export const detail = (id) => {
  return instance({
    url: "/exam/api/repo/detail",
    method: "POST",
    data: {
      id,
    },
  });
};
