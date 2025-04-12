<script setup lang="ts">
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { USERS_KEY } from "../vars/const";

const { addDeleteModal, enterUser } = useStore();
const { unblockModal, formUser, users } = storeToRefs(useStore());

function changedUser() {
  // изменение пользователя
  if (formUser.value.id) {
    const obj = {...formUser.value}
    users.value = users.value.map((el) => {
      if (el.id == formUser.value.id) {
        return obj;
      }
      return el;
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users.value))
  } else {
    // добавление нового пользователя
    formUser.value.id = Date.now().toString();
    const obj = {...formUser.value}
    enterUser(obj);
  }

  clearForm();
};

const clearForm = () => {
  formUser.value = {
    id: "",
    name: "",
    company: "",
    group: "Не выбрано",
    online: false,
  };
  addDeleteModal();
};
</script>

<template>
  <el-dialog v-model="unblockModal" width="500" :before-close="clearForm">
    <form action="" className="form" @submit.prevent="changedUser">
      <div className="form-row">
        <div>ФИО</div>
        <input v-model="formUser.name" />
      </div>

      <div className="form-row">
        <div>Компания</div>
        <input v-model="formUser.company" />
      </div>

      <div className="form-row">
        <div>Группа</div>
        <select defaultValue="Не выбрано" v-model="formUser.group">
          <option value="Не выбрано">Не выбрано</option>
          <option value="Клиент">Клиент</option>
          <option value="Прохожий">Прохожий</option>
          <option value="Партнер">Партнер</option>
        </select>
      </div>

      <div className="form-row">
        <div>Присутствие</div>
        <input
          type="checkbox"
          className="checkbox"
          v-model="formUser.online"
        />
      </div>
      <button :className="formUser.id ? 'save' : 'add'" type="submit">
        {{ formUser.id ? "Сохранить" : "Добавить" }}
      </button>
      <button @click="clearForm" type="button">Закрыть</button>
    </form>
  </el-dialog>
</template>

<style scoped>
.form {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;

  button {
    width: 30%;
    margin: 10px;
    height: 30px;
    border-radius: 10px;
    border: none;
    color: white;
    background: gray;
  }

  .add {
    background: #4caf50;
  }

  .save {
    background: #4caf50;
  }
}

button:hover {
  box-shadow: 1px 1px 5px 3px rgb(185, 185, 185);
  cursor: pointer;
}

button:active {
  opacity: 0.5;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 10px 0;
  height: 30px;
  color: #4E3000;

  input {
    border: none;
    border-bottom: solid 1px rgb(158, 158, 158);
  }


  select {
    width: 49%;
    border: none;
    border-bottom: solid 1px rgb(158, 158, 158);
  }
}

.checkbox {
  margin-right: 45%;
}
</style>
