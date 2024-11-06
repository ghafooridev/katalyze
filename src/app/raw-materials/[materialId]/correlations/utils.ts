export const transformResponse: any = (apiResponse) => Object.keys(apiResponse).map((key) => ({
  id: key,
  data: apiResponse[key].map((item) => ({
    x: item?.name,
    y: parseFloat(item?.value).toFixed(3),
  })),
}));
