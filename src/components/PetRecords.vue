<template>
  <ion-card class="records-card">

    <ion-card-header>
      <div class="section-title">

        <div class="section-icon">
          📋
        </div>

        <div>
          <ion-card-title>Pet Records</ion-card-title>

          <p>
            View and manage your registered pets.
          </p>
        </div>

      </div>
    </ion-card-header>


    <ion-card-content>

      <!-- If there are no records -->
      <div v-if="pets.length === 0" class="empty-state">

        <div class="empty-icon">
          🐾
        </div>

        <h3>No Pet Records</h3>

        <p>
          Add a pet using the form above.
        </p>

      </div>


      <!-- Records Table -->
      <div v-else class="table-container">

        <table>

          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Animal Type</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Owner</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            <tr
              v-for="pet in pets"
              :key="pet.id"
            >

              <td>
                <strong>{{ pet.petName }}</strong>
              </td>

              <td>
                {{ pet.animalType }}
              </td>

              <td>
                {{ pet.breed }}
              </td>

              <td>
                {{ pet.age }}
              </td>

              <td>
                {{ pet.ownerName }}
              </td>

              <td>
                {{ pet.notes || '—' }}
              </td>

              <td class="actions">

                <ion-button
                  size="small"
                  color="primary"
                  @click="$emit('edit', pet)"
                >
                  EDIT
                </ion-button>

                <ion-button
                  size="small"
                  color="danger"
                  @click="$emit('delete', pet.id!)"
                >
                  DELETE
                </ion-button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </ion-card-content>

  </ion-card>
</template>


<script setup lang="ts">

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/vue';

import type { Pet } from '../services/petService';

defineProps<{
  pets: Pet[];
}>();

defineEmits<{
  edit: [pet: Pet];
  delete: [id: string];
}>();

</script>