<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  activities: Array,
})
</script>

<template>
  <div class="section">
    <div v-if="activities.length > 0">
      <div v-for="(activity, index) in activities" :key="index" class="card mb-4">
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
                  <strong>{{ activity.username }}</strong> <small>@{{ activity.userId }}</small>
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

<style scoped>
.box {
  width: 100%;
}
.level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.level-left {
  display: flex;
  gap: 10px;
}

.level-item {
  display: flex;
  align-items: center;
}
</style>
