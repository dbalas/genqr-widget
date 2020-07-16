<template>
  <div id="genqr-app">
    <div class="wrapper card">
      <transition name="slide">
        <BasicForm v-if="step === 0" @next="next" />
        <ExtendedForm v-if="step === 1" @next="next" />
        <QRView v-if="step === 2" :data="allData" @again="again" />
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import BasicForm from './components/BasicForm';
import ExtendedForm from './components/ExtendedForm';
import QRView from './components/QRView';

export default {
  name: 'App',
  setup() {
    let allData = ref({});
    let step = ref(0);
    return {
      step,
      allData,
      next(data) {
        allData.value = {
          ...allData.value,
          ...data,
        };
        step.value++;
      },
      again() {
        allData.value = {};
        step.value = 0;
      },
    };
  },
  components: {
    BasicForm,
    ExtendedForm,
    QRView,
  },
};
</script>

<style lang="scss">
@import '@/assets/variables';
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import '@braid/vue-formulate/themes/snow/snow.scss';

#genqr-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  display: flex;
  justify-content: center;

  textarea:focus,
  button:focus,
  input[type='text']:focus,
  input[type='password']:focus,
  input[type='datetime']:focus,
  input[type='datetime-local']:focus,
  input[type='date']:focus,
  input[type='month']:focus,
  input[type='time']:focus,
  input[type='week']:focus,
  input[type='number']:focus,
  input[type='email']:focus,
  input[type='url']:focus,
  input[type='search']:focus,
  input[type='tel']:focus,
  input[type='color']:focus,
  .uneditable-input:focus {
    outline: 0;
    outline: thin dotted \9;
    box-shadow: none !important;
  }

  input::placeholder {
    color: #e0e0e0 !important;
  }

  .wrapper {
    position: relative;
    margin: 2em;
    overflow: hidden;
  }

  .formulate-form {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .formulate-form,
  .qr-view {
    width: 24em;
    height: 31em;
    padding: 2em;

    @include media-breakpoint-down(xs) {
      width: auto;
      padding: 1em;
    }
  }

  .formulate-input-element--submit {
    text-align: center;
  }

  .formulate-input {
    position: relative;
    margin-bottom: 1.7em;
    & .formulate-input-errors {
      position: absolute;
    }
  }

  .formulate-input:last-child {
    margin-bottom: 0;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: flex-end;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.3s ease-in-out;
}

.slide-leave-active {
  position: absolute;
  height: 100%;
}

.slide-enter {
  transform: translate(100%, 0);
}

.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
