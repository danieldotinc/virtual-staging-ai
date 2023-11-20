import { v4 as uuidv4 } from 'uuid';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';

import config from '../config';

const DB = getFirestore(config);
const COLLECTION = 'properties';

export type Property = {
  title: string;
  rent: string;
  areaCode: string;
  street: string;
  numberOfRooms: string;
  numberOfBaths: string;
  cover: { ref: string; link: string };
  images: { ref: string; link: string }[];
};

const get = async (id: string) => {
  let docRef = doc(DB, COLLECTION, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

const list = async () => {
  const result: Property[] = [];
  let error = null;

  try {
    const all = await getDocs(collection(DB, COLLECTION));
    all.forEach(r => {
      result.push(r.data() as unknown as Property);
    });
  } catch (e) {
    error = e;
  }

  return result;
};

const create = async (property: Property) => {
  let result = null;
  let error = null;

  try {
    const id = uuidv4();
    result = await setDoc(doc(DB, COLLECTION, id), property, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default { create, get, list };
