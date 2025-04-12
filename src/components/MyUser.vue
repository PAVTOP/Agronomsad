<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { FilterByState } from "../models/models";

const { clearUser, addDeleteModal } = useStore();
const {
  users,
  filterByName,
  filterByState,
  formUser,
} = storeToRefs(useStore());

const filteredUsers = computed(() =>
users.value
    .filter(
      (el) =>
      el.name.toLowerCase().includes(filterByName.value.toLowerCase())
    )
    .filter((el) => {
      switch (filterByState.value) {
        case FilterByState.online:
          return el.online;
        case FilterByState.offline:
          return !el.online;
        case FilterByState.all:
          return el;
        default:
          return "all";
      }
    })
);
</script>

<template>
   <TransitionGroup name="block">
  <div
    className="row"
    v-for="(user, index) in filteredUsers"
    :key="user.id"
    @click="
      () => {
        formUser = {...user};
        addDeleteModal();
      }
    "
  >
    <div className="col-1">{{ index + 1 }}</div>
    <div className="col-2">{{ user.name }}</div>
    <div className="col-3">{{ user.company }}</div>
    <div className="col-4">{{ user.group }}</div>
    <div className="center col-5">
      <div :className="user.online ? 'true' : 'false'"></div>
    </div>
    <div className="col-6 center">
      <div
        className="icon"
        @click="
          (e) => {
            e.stopPropagation();
            clearUser(user.id);
          }
        "
      >
        &#10006;
      </div>
    </div>
  </div>
</TransitionGroup>
</template>

<style scoped>
.block-move, 
.block-enter-active,
.block-leave-active {
  transition: all 0.6s ease-in-out;
}

.block-enter-from,
.block-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.block-leave-active {
  position:relative;
}

.row {
  display: flex;
  margin: 5px 0;
  height: 55px;
  align-items: center;
}

.icon {
  color: rgb(126, 126, 126);
  opacity: 0;
  font-size: 18px;


  :active {
    color: white;
  }
}

.icon:hover{
  color: #ec5937;
}

.icon:active{
  color: white;
}

.row:hover {
  box-shadow: 1px 1px 20px 1px rgb(147, 174, 147);
  border-radius: 10px;
  cursor: pointer;

  .icon {
    opacity: 1;
  }
}
</style>
