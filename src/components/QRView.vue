<template>
  <div class="qr-view">
    <p class="h2 text-uppercase mb-0">{{ $t('Your QR code') }}</p>
    <img class="qr-code mb-3 mt-3" :src="base64Svg" alt="QR" />
    <a :href="base64Svg" @click="download">
      <b-button variant="outline-info p-2" class="rounded-circle">
        <BIconDownload font-scale="2" />
      </b-button>
    </a>
    <b-button @click="again" class="d-flex align-items-center mt-3" pill variant="outline-dark">
      <span>{{ $t('Generate another QR') }}</span>
      <BIconChevronRight class="ml-2" />
    </b-button>
  </div>
</template>

<script>
import { BIconDownload, BIconChevronRight } from 'bootstrap-vue';
import { ref } from '@vue/composition-api';
import QRCode from 'qrcode';

const toKebabCase = (string) =>
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

const downloadSvg = (name, svg) => {
  var svgData = svg;
  var preface = '<?xml version="1.0" standalone="no"?>\r\n';
  var svgBlob = new Blob([preface, svgData], { type: 'image/svg+xml;charset=utf-8' });
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export default {
  props: {
    data: Object,
  },
  components: {
    BIconDownload,
    BIconChevronRight,
  },
  setup(props, context) {
    let qrCode;
    let base64Svg = ref('');

    const qrData = [
      props.data.name,
      new Date(props.data.birthDate).toLocaleDateString(),
      props.data.emergencyPhone,
      props.data.bloodType,
      '\n',
      context.parent.$t('Diseases') + ':',
      props.data.diseases,
      '\n',
      context.parent.$t('Allergies') + ':',
      props.data.allergies,
    ]
      .map((item) => String(item).trim())
      .join('\n');

    QRCode.toString(qrData, { errorCorrectionLevel: 'Q', type: 'svg' })
      .then((code) => {
        qrCode = code;
        base64Svg.value = `data:image/svg+xml;base64,${window.btoa(code)}`;
      })
      .catch((err) => {
        console.error(err);
      });
    return {
      base64Svg,
      download: () => downloadSvg(toKebabCase(props.data.name), qrCode),
      again: () => context.emit('again'),
    };
  },
};
</script>

<style lang="scss">
.qr-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-code {
  width: 15em;
  height: 15em;
}
</style>
