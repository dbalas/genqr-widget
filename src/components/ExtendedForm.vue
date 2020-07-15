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
        label: context.parent.$t('Diseases'),
        name: 'diseases',
        rows: 5,
        type: 'textarea',
        validation: 'max:500,length',
        validationName: context.parent.$t('Diseases'),
      },
      {
        label: context.parent.$t('Allergies'),
        name: 'allergies',
        rows: 5,
        type: 'textarea',
        validation: 'max:500,length',
        validationName: context.parent.$t('Allergies'),
      },
      {
        label: context.parent.$t('Generate'),
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
