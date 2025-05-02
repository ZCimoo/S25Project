<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAll, type Activity, getByUser } from '../models/activities'
import { type DataListEnvelope } from '../models/dataEnvelopes'
import { refSession, isLoggedIn } from '@/models/session'
import { type User, getAll as getAllUsers } from '../models/users'

const session = refSession()
const activities = ref({} as DataListEnvelope<Activity>)
onMounted(async () => {
  const userId = session.value.user?.userid
  if (userId) {
    activities.value = await getByUser(userId)
  }
})
</script>

<template>
  <div class="section">
    <div v-if="isLoggedIn()">
      <div v-for="activity in activities.items" :key="activity.id" class="card mb-4">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>@{{ activity.username }}</strong>
                  <br />
                  <small>{{ activity.date }}</small>
                  <br />
                  <strong>{{ activity.title }}</strong>
                  <br />
                  Type: {{ activity.type }}
                  <br />
                  Location: {{ activity.location }}
                  <br />
                  Duration: {{ activity.duration }}
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left is-flex">
                  <a class="level-item" aria-label="reply">
                    <span class="icon is-small">
                      <i class="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>
                  <a class="level-item" aria-label="retweet">
                    <span class="icon is-small">
                      <i class="fas fa-retweet" aria-hidden="true"></i>
                    </span>
                  </a>
                  <a class="level-item" aria-label="like">
                    <span class="icon is-small">
                      <i class="fas fa-heart" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>
    <p v-else class="has-text-centered">No exercises logged yet</p>
  </div>
</template>

<style scoped></style>
