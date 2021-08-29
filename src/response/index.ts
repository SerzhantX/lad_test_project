interface IResponse {
  status: string,
  data: any,
}

function makeResponse(status: string, data: any): IResponse {
  return {
    status,
    data,
  }
}

const responses = {
  success: (data: any = null): IResponse => {
    return makeResponse('success', data);
  },

  notSuccess: (data: any = null): IResponse => {
    return makeResponse('notSuccess', data);
  },

  notExistText: (data: any = null): IResponse => {
    return makeResponse('notExistText', data);
  },

  invalidLogin: (data: any = null): IResponse => {
    return makeResponse('invalidLogin', data);
  },

  invalidPassword: (data: any = null): IResponse => {
    return makeResponse('invalidPassword', data);
  },

  existLogin: (data: any = null): IResponse => {
    return makeResponse('existLogin', data);
  },

  notExistUser: (data: any = null): IResponse => {
    return makeResponse('notExistUser', data);
  },

  notAuth: (data: any = null): IResponse => {
    return makeResponse('notAuth', data);
  }
}

export { responses }