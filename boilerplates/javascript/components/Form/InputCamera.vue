<template>
  <div class="mb-4">
    <label :for="name" class="d-inline-block text-body-2 mb-2">
      {{ label }}
    </label>
    <input
      :id="name"
      :ref="name"
      type="file"
      accept="image/*"
      capture="user"
      class="d-none"
      @change="handleChange"
    />
    <v-flex>
      <v-img v-if="fileUrl" :src="fileUrl" class="mb-4" />
      <v-btn
        block
        color="primary"
        :disabled="disabled"
        :loading="loading"
        @click="handleSelect"
      >
        <v-icon left class="mr-4">mdi-camera</v-icon>
        <span v-if="!fileUrl">Buka Kamera</span>
        <span v-else>Ambil Ulang</span>
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'InputCamera',
  props: {
    name: { type: String, required: true },
    label: { type: String, default: 'Take A Photo' },
    old: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return { file: '', fileUrl: '', loading: false }
  },
  watch: {
    old(val) {
      this.fileUrl = val
    },
  },
  beforeDestroy() {
    if (String(this.fileUrl).startsWith('blob:')) {
      URL.revokeObjectURL(this.fileUrl)
    }
  },
  mounted() {
    if (this.old) this.fileUrl = this.old
  },
  methods: {
    handleSelect() {
      this.$refs[this.name].click()
    },
    handleDataToUrl(url) {
      const BASE64_MARK = ';base64,'

      let parts = ''
      let contentType = ''
      let raw = ''

      if (!url.includes(BASE64_MARK)) {
        parts = url.split(',')
        contentType = parts[0].split(':')[1]
        raw = parts[1]

        return new Blob([raw], { type: contentType })
      }

      parts = url.split(BASE64_MARK)
      contentType = parts[0].split(':')[1]
      raw = window.atob(parts[1])
      const rawLength = raw.length

      const uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) uInt8Array[i] = raw.charCodeAt(i)

      return new Blob([uInt8Array], { type: contentType })
    },
    handleCompress(file) {
      if (file.type.match(/image.*/)) {
        this.loading = true

        const reader = new FileReader()
        reader.addEventListener('load', (readerEvent) => {
          const image = new Image()
          image.addEventListener('load', () => {
            const canvas = document.createElement('canvas')
            const maxSize = 1024

            let width = image.width
            let height = image.height

            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width
                width = maxSize
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height
                height = maxSize
              }
            }

            canvas.width = width
            canvas.height = height
            canvas.getContext('2d').drawImage(image, 0, 0, width, height)

            const dataUrl = canvas.toDataURL('image/jpeg')
            const resizedImage = this.handleDataToUrl(dataUrl)

            const compressedFile = new File(
              [resizedImage],
              'imageresized.jpg',
              { type: 'image/jpeg' },
            )

            this.loading = false
            this.fileUrl = URL.createObjectURL(compressedFile)
            this.$emit('change', compressedFile)
          })
          image.src = readerEvent.target.result
        })
        reader.readAsDataURL(file)
      }
    },
    handleChange({ target: { files } }) {
      if (files.length > 0) {
        if (String(this.fileUrl).startsWith('blob:'))
          URL.revokeObjectURL(this.fileUrl)

        this.handleCompress(files[0])
      }
    },
  },
}
</script>
