import { getDownloadURL, getStorage, list as listPhotos, ref } from 'firebase/storage';

const storage = getStorage();
const storageRef = ref(storage, `images`);

export type Photo = {
  ref: string;
  link: string;
  assignedProperty?: string;
};

const list = async () => {
  const photos: Photo[] = [];

  const result = await listPhotos(storageRef);
  result.items.forEach(async item => {
    const itemRef = ref(storage, `images/${item.name}`);
    const url = await getDownloadURL(itemRef);
    photos.push({ ref: itemRef.fullPath, link: url });
  });

  return photos;
};

export default { list };
