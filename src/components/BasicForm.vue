<template>
  <FormulateForm v-model="data" :schema="schema" @submit="submit" />
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  setup(_, context) {
    const data = ref({});
    const schema = [
      {
        label: context.parent.$t('Name'),
        name: 'name',
        type: 'text',
        validation: 'required|max:100,length',
        validationName: context.parent.$t('Name'),
      },
      {
        label: context.parent.$t('Birth date'),
        name: 'birthDate',
        type: 'date',
        validation: 'required|max:100,length',
        validationName: context.parent.$t('Birth date'),
      },
      {
        label: context.parent.$t('Blood type'),
        name: 'bloodType',
        type: 'text',
        validation: 'required|max:100,length',
        validationName: context.parent.$t('Blood type'),
      },
      {
        label: context.parent.$t('Emergency phone'),
        name: 'emergencyPhone',
        type: 'tel',
        validation: 'required|max:100,length',
        validationName: context.parent.$t('Emergency phone'),
      },
      {
        label: context.parent.$t('Continue'),
        type: 'submit',
      },
    ];

    return {
      data,
      schema,
      submit: () => {
        context.emit('next', data.value);
      },
    };
  },
};
</script>

<style lang="scss"></style>
