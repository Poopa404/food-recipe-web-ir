//ContextMenu.vue
<template>
  <div
      class="fixed z-50 context-menu bg-pr-white"
      :style="{ top: y + 'px', left: x + 'px' }"
  >
    <div
        v-for="action in actions"
        :key="action.action"
        @click="emitAction(action.action)"
    >
      {{ action.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const { actions, x, y } = defineProps(['actions', 'x', 'y']);
const emit = defineEmits(['action-clicked']);

const emitAction = (action: any) => {
  emit('action-clicked', action);
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
}

.context-menu div {
  padding: 10px;
  cursor: pointer;
}

.context-menu div:hover {
  background-color: #f0f0f0;
}
</style>