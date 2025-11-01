// utils/queryString.ts
export const objectToQueryString = (
  params: Record<string, string | number>
): string => {
  return new URLSearchParams(
    Object.entries(params).reduce((acc, [key, val]) => {
      acc[key] = String(val);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
};
