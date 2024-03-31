export interface StorageType {
  [key: string]: string | number | boolean | object;
}

export type storagePayload = {
  prop: string;
  value: string | number | boolean | object | null;
};

export const getStorage = async () => {
  const storage = localStorage.getItem("storage");

  if (storage) {
    return JSON.parse(storage);
  }

  return {};
};

export const updateStorage = async ({ prop, value }: storagePayload) => {
  const storage = await getStorage();
  const newStorage = Object.assign(storage, { [prop]: value });

  localStorage.setItem("storage", JSON.stringify(newStorage));

  return newStorage;
};
