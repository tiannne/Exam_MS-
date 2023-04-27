import instance from "../utils/createaxios";

export const user = (current, size, params) => {
  return instance({
    url: "/exam/api/sys/user/paging",
    method: "POST",
    data: {
      current,
      size,
      params,
    },
  });
};

export const list = () => {
  return instance({
    url: "/exam/api/sys/depart/tree",
    method: "POST",
    data: {},
  });
};

export const del = (ids) => {
  return instance({
    url: "/exam/api/sys/user/delete",
    method: "POST",
    data: {
      ids
    },
  });
};

export const update = (obj) => {
  return instance({
    url: "/exam/api/sys/user/update",
    method: "POST",
    data: obj,
  });
};

