<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        {{ editingId ? 'Edit Pet' : 'Add Pet' }}
      </ion-card-title>
    </ion-card-header>

    <ion-card-content>

      <ion-item>
        <ion-input
          v-model="form.petName"
          label="Pet Name"
          label-placement="floating"
          placeholder="Enter pet name"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="form.animalType"
          label="Animal Type"
          label-placement="floating"
          placeholder="Dog, Cat, etc."
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="form.breed"
          label="Breed"
          label-placement="floating"
          placeholder="Enter breed"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="form.age"
          type="number"
          label="Age"
          label-placement="floating"
          placeholder="Enter age"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="form.ownerName"
          label="Owner Name"
          label-placement="floating"
          placeholder="Enter owner name"
        />
      </ion-item>

      <ion-item>
        <ion-textarea
          v-model="form.notes"
          label="Notes"
          label-placement="floating"
          placeholder="Enter notes"
        />
      </ion-item>

      <ion-button
        expand="block"
        @click="save"
      >
        {{ editingId ? 'UPDATE PET' : 'ADD PET' }}
      </ion-button>

      <ion-button
        v-if="editingId"
        expand="block"
        fill="outline"
        color="medium"
        @click="cancel"
      >
        CANCEL
      </ion-button>

    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/vue';

import { reactive, watch } from 'vue';
import type { Pet } from '../services/petService';

const props = defineProps<{
  editingId: string | null;
  pet?: Pet;
}>();

const emit = defineEmits<{
  save: [pet: Pet];
  cancel: [];
}>();

const form = reactive<Pet>({
  petName: '',
  animalType: '',
  breed: '',
  age: '',
  ownerName: '',
  notes: ''
});

const resetForm = () => {
  form.petName = '';
  form.animalType = '';
  form.breed = '';
  form.age = '';
  form.ownerName = '';
  form.notes = '';
};

watch(
  () => props.pet,
  (pet) => {
    if (pet) {
      form.petName = pet.petName || '';
      form.animalType = pet.animalType || '';
      form.breed = pet.breed || '';
      form.age = pet.age || '';
      form.ownerName = pet.ownerName || '';
      form.notes = pet.notes || '';
    }
  },
  { immediate: true }
);

watch(
  () => props.editingId,
  (editingId) => {
    if (!editingId) {
      resetForm();
    }
  }
);

const save = () => {
  if (
    !form.petName ||
    !form.animalType ||
    !form.breed ||
    !form.age ||
    !form.ownerName
  ) {
    alert('Please fill in all required fields.');
    return;
  }

  emit('save', { ...form });
};

const cancel = () => {
  resetForm();
  emit('cancel');
};
</script>