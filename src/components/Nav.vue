<script setup lang="ts">
import { useStore } from '../store/store';
import { storeToRefs } from "pinia";

const { addDeleteModal } = useStore()
const { users, filterByName, } = storeToRefs(useStore());
</script>

<template>
  <div className="nav">
      <img src="https://i.ibb.co/xjr3F8P/image.png" alt="" />
      <input placeholder="Поиск по имени" v-model="filterByName"/>
      <button className="add" @click="addDeleteModal">
        Добавить
      </button>
      <div>
        Посетители
        <br />
        <span className="all">{{users.filter((el) => el.online == true).length}}</span> /{{" "}}
        <span className="online">{{users.filter((el) => el.online == false).length}}</span>
      </div>
    </div>
</template>

<style scoped>
.nav {
  display: flex;
  height: 50px;
  align-items: center;
  gap: 10px;
  

  img {
    width: 100px;
  }

  input {
    height: 30px;
    border-radius: 10px;
    text-align: center;
    border: solid 1px rgb(199, 199, 199);
  }

  button {
    width: 150px;
    height: 33px;
    border-radius: 10px;
    border: none;
    color: white;
    background: #4caf50;
    
  }

  div {
    text-align: end;
    margin-left: auto;
  }

  .all {
    color: #80bb00;
  }

  .online {
    color: #ec5937;
  }
}
</style>