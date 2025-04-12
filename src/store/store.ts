import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "../models/models";
import { USERS_KEY } from "../vars/const";

export const useStore = defineStore("users", () => {
  // модальное окно
  const unblockModal = ref(false);

  function addDeleteModal() {
    unblockModal.value = !unblockModal.value;
  }

  // пользователи
  const formUser = ref<User>({
    id:  "",
    name: "",
    company: "",
    group: "Не выбрано",
    online: false,
  })
  const users = ref<User[]>(JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]'));
  const filterByName = ref<string>("");
  const filterByState = ref<string>('all')

  function enterUser(el: User) {
    users.value.push(el);
    localStorage.setItem(USERS_KEY, JSON.stringify(users.value))
  }

  function clearUser(id: string) {
    users.value = users.value.filter((el) => el.id != id);
    localStorage.setItem(USERS_KEY, JSON.stringify(users.value))
  }

  return {
    unblockModal,
    addDeleteModal,
    users,
    enterUser,
    clearUser,
    filterByName,
    filterByState,
    formUser
  };
});
