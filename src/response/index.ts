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
  }
}

export { responses }