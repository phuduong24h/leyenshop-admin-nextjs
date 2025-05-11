export const deDuplicate = (arr, key = 'id') => {
  const map = new Map();
  return arr?.filter?.(item => {
    const keyValue = item[key];
    if (map.has(keyValue)) {
      return false;
    }
    map.set(keyValue, true);
    return true;
  });
};

export const getFormFunction = ({ form, name, error, value } = {}) => {
  return {
    errorForm: error || form?.error?.(name),
    valueForm: value || form?.values?.[name],
    onChangeForm: form?.onChange?.(name)
  };
};
