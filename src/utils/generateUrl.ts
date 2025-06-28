type Data = string | number;
type DataArray = Data[];

interface Props {
  params: Record<string, DataArray | string | number | undefined | null>;
  path: string;
}

export const generateUrl = ({ path, params }: Props) => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((p) => {
    if (typeof params[p] === 'undefined' || params[p] === null) {
      delete params[p];
    } else if (typeof params[p] === 'string' && params[p]) {
      searchParams.append(p, params[p] as string);
    } else if (typeof params[p] === 'number' && params[p]) {
      searchParams.append(p, params[p]?.toString());
    } else if (Array.isArray(params[p])) {
      // remove if array length is 0
      if ((params[p] as DataArray).length === 0) {
        return;
      }

      // convert array to params string
      (params[p] as DataArray).forEach((el) => {
        searchParams.append(`${p}`, el?.toString());
      });
    }
  });

  return decodeURIComponent(`${path}?${searchParams}`);
};
