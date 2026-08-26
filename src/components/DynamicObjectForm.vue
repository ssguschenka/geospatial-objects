<template>
  <form v-if="config"
        @submit.prevent="handleSubmit"
        class="form">
  <h2 class="form-title">{{config.title}}</h2>

    <div v-for="field in config.fields" :key="field.name" class="form-field">
      <label :for="field.name" class="form-label">
        {{field.label}}
      <span v-if="field.required">*</span>
      </label>

      <input
        v-if="field.type === 'text'"
        :id="field.name"
        type="text"
        v-model="formData[field.name]"
        v-maska="field.mask"
        class="form-input"
        :class="{ 'input-error': errors[field.name] }"
        />

      <input
        v-else-if="field.type === 'number'"
        :id="field.name"
        type="number"
        v-model="formData[field.name]"
        class="form-input"
        />

      <select
        v-else-if="field.type === 'select'"
        :id="field.name"
        v-model="formData[field.name]"
        class="form-input"
        >
        <option
        v-for="option in field.options"
        :key="option.value"
        :value="option.value"
        class="form-option"
        >
          {{option.label}}
        </option>
      </select>

      <span
        v-if="errors[field.name]"
        class="form-error"
        >
        {{ errors[field.name] }}
      </span>
    </div>

    <div class="form-actions">
      <button type="button" @click="handleCancel" class="form-btn close-btn">
        Отмена
      </button>
      <button type="submit" class="form-btn save-btn">
        Сохранить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import objectConfig from "../config/objectConfig.json"
import type { ObjectType, ObjectConfig } from "@/types.ts";
import {useObjectsStore} from "@/stores/objects.ts";

const props = defineProps<{
  objectType: ObjectType,
}>();

const emit = defineEmits<{
  submit: [data: Record<string, unknown>];
  cancel: []
}>();

const config = computed(() => {
  const typedConfig = objectConfig as ObjectConfig;
  return typedConfig[props.objectType];
});

//создаем рееактивный обьект формы- он пока пустой
const formData = reactive<Record<string, unknown>>({});

const errors = reactive<Record<string, string>>({});

const objectStore = useObjectsStore();

// Проверяем required, pattern и кадастровый номер на уникальность при submit
const validateForm = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key]; // Очищаем предыдущие ошибки
  })

  let isValid = true;

  for (const field of config.value.fields) {
    const value = formData[field.name];

    // проверяем что обязательное поле не пустое
    if (field.required && !value) {
      errors[field.name] = 'Поле обязательно для заполнения';
      isValid = false;
      continue;
    }

    // Проверяем pattern
    if( value && field.validation?.pattern) {
      const regex = new RegExp(field.validation.pattern);

      if (!regex.test(String(value))) {
        errors[field.name] = 'Некорректный формат';
        isValid = false;
        continue
      }
    }

    // Проверяем, что кадастровый номер уникален
    if(field.name === 'cadastralNumber' && objectStore.getObjectByCadastral(String(value))) {
      errors[field.name] = 'Такой номер уже существует';
      isValid = false;
    }
  }
  return isValid;
}

// Сохранить обьект
const handleSubmit =  () => {
  if(!validateForm()){
    return
  }
  emit("submit", {...formData});
};

// Закрыть форму
const handleCancel =  () => {
  emit("cancel");
}
</script>

<style scoped>
.form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  gap: 1.3em;
  border: 1px solid #1f3436;
  border-radius: 15px;
  padding: 1.3em;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  background-color: #fff;
}

.form-title {
  text-align: center;
  inline-size: 100%;
  font-size: 1.7em;
  margin: 0;
  padding: 0 0 0.7em 0;
}

.form-field {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
  min-inline-size: 0;
}

.form-field label {
  min-inline-size: 0;
  overflow-wrap: break-word;
}

.form-input {
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #1f3436;
  padding: 0.7em;
  inline-size: 60%;
  transition: box-shadow 0.3s;
  font-size: 1em;
  min-inline-size: 0;
}

.form-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #2b4649;
}

.form-input:hover {
  box-shadow: 2px 4px 8px rgb(62 97 100);
}

.input-error {
  box-shadow: 0 0 0 2px rgb(245 11 11);
}

.form-error {
  position: absolute;
  top: -50%;
  right: 0;
  font-size: 0.8em;
}

.form-option {
  font-size: 1em;
  padding: 1em;
}

.form-actions {
  inline-size: 100%;
  display: flex;
  justify-content: space-around;
}

.form-btn {
  inline-size: 25%;
  font-size: 1em;
  padding: 2% 5%;
  border-radius: 15px;
  border: none;
  transition: box-shadow 0.3s;
}

.close-btn {
  background-color: #bec0c0;
}

.close-btn:hover {
  box-shadow: 0 0 0 2px rgb(100 100 100);
}

.save-btn {
  background-color: rgb(167 218 163 / 0.96);
}

.save-btn:hover {
  box-shadow: 0 0 0 2px rgb(60 143 40 / 0.96);
}

</style>
