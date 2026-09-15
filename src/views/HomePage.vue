<template>
  <ion-page>

    <!-- HEADER -->
    <ion-header>
      <ion-toolbar class="main-toolbar">
        <div class="brand">
          <div class="logo">🐾</div>

          <div>
            <h1>PetCare</h1>
            <p>Pet Information Manager</p>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>


    <ion-content>

      <!-- WELCOME SECTION -->
      <section class="welcome-section">
        <div>
          <p class="welcome-small">WELCOME TO PETCARE</p>

          <h2>
            Manage your pets<br />
            with ease.
          </h2>

          <p class="welcome-text">
            Keep your pet information organized and accessible
            in one simple place.
          </p>
        </div>

        <div class="pet-icon">
          🐶
        </div>
      </section>


      <!-- FORM -->
      <div class="page-container">

        <PetForm
          :editing-id="editingId"
          :pet="selectedPet"
          @save="savePet"
          @cancel="cancelEdit"
        />


        <!-- RECORDS -->
        <PetRecords
          :pets="pets"
          @edit="editPet"
          @delete="removePet"
        />

      </div>

    </ion-content>

  </ion-page>
</template>


<script setup lang="ts">

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent
} from '@ionic/vue';

import { ref, onMounted } from 'vue';

import PetForm from '../components/PetForm.vue';
import PetRecords from '../components/PetRecords.vue';

import {
  addPet,
  updatePet,
  getPets,
  deletePet
} from '../services/petService';

import type { Pet } from '../services/petService';


// PET DATA

const pets = ref<Pet[]>([]);

const editingId = ref<string | null>(null);

const selectedPet = ref<Pet>();


// LOAD PETS

onMounted(() => {
  getPets((data) => {
    pets.value = data;
  });
});


// SAVE PET

const savePet = async (pet: Pet) => {

  try {

    if (editingId.value) {

      await updatePet(editingId.value, pet);

      alert('Pet updated successfully!');

    } else {

      await addPet(pet);

      alert('Pet added successfully!');

    }

    cancelEdit();

  } catch (error) {

    console.error(error);

    alert('Firebase Error:\n' + String(error));

  }

};


// EDIT PET

const editPet = (pet: Pet) => {

  editingId.value = pet.id!;

  selectedPet.value = pet;

};


// DELETE PET

const removePet = async (id: string) => {

  if (!confirm('Are you sure you want to delete this pet?')) {
    return;
  }

  try {

    await deletePet(id);

    alert('Pet deleted successfully!');

  } catch (error) {

    console.error(error);

    alert('Firebase Error:\n' + String(error));

  }

};


// CANCEL EDIT

const cancelEdit = () => {

  editingId.value = null;

  selectedPet.value = undefined;

};

</script>