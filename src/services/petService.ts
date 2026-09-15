import {
  ref as dbRef,
  push,
  set,
  onValue,
  update,
  remove
} from 'firebase/database';

import { db } from '../firebase';

export interface Pet {
  id?: string;
  petName: string;
  animalType: string;
  breed: string;
  age: string;
  ownerName: string;
  notes: string;
}

export const addPet = async (pet: Pet) => {
  const newPet = push(dbRef(db, 'pets'));

  await set(newPet, {
    petName: pet.petName,
    animalType: pet.animalType,
    breed: pet.breed,
    age: pet.age,
    ownerName: pet.ownerName,
    notes: pet.notes
  });
};

export const updatePet = async (id: string, pet: Pet) => {
  await update(dbRef(db, `pets/${id}`), {
    petName: pet.petName,
    animalType: pet.animalType,
    breed: pet.breed,
    age: pet.age,
    ownerName: pet.ownerName,
    notes: pet.notes
  });
};

export const getPets = (callback: (pets: Pet[]) => void) => {
  onValue(dbRef(db, 'pets'), (snapshot) => {
    const data = snapshot.val() || {};

    const pets = Object.keys(data).map((id) => ({
      id,
      ...data[id]
    }));

    callback(pets);
  });
};

export const deletePet = async (id: string) => {
  await remove(dbRef(db, `pets/${id}`));
};