const fs = require('fs')
const clone = require('git-clone')
const rimraf = require('rimraf')

module.exports = {
  prompts: [
    {
      name: 'version',
      message: 'Select Boilerplate Version : ',
      type: 'list',
      choices: [
        { name: 'JavaScript (@adenvt signature)', value: 'javascript-adenvt' },
        { name: 'JavaScript (Tailwind)', value: 'javascript-tailwind' },
        { name: 'JavaScript with dci-auth', value: 'javascript' },
        { name: 'TypeScript with dci-auth', value: 'typescript' },
      ],
      default: 'javascript',
    },
  ],
  async completed() {
    const folderPath = this.outDir

    await clone(
      'https://github.com/privy-open-source/nuxt-boilerplate',
      folderPath,
      [],
      async () => {
        const allFiles = fs
          .readdirSync(`${folderPath}/boilerplates/${this.answers.version}`)
          .map((fileName) => {
            return fileName
          })

        for (let i = allFiles.length - 1; i >= 0; i--) {
          var file = allFiles[i]
          fs.rename(
            `${folderPath}/boilerplates/${this.answers.version}/${file}`,
            `${folderPath}/${file}`,
            (err) => {
              if (err) {
                console.log(err)
              }
            },
          )
        }

        rimraf(`${folderPath}/.git`, (e) => e && console.log(e))
        rimraf(`${folderPath}/.github`, (e) => e && console.log(e))
        rimraf(`${folderPath}/lib`, (e) => e && console.log(e))
        rimraf(`${folderPath}/boilerplates`, (e) => e && console.log(e))
      },
    )
  },
}
