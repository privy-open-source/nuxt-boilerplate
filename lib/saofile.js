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
        { name: 'JavaScript', value: 'javascript' },
        { name: 'JavaScript (@adenvt signature)', value: 'adenvt-javascript' },
        { name: 'TypeScript', value: 'typescript' },
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
      () => {
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

        rimraf(`${folderPath}/.git`, (err) => {
          if (err) {
            console.log(err)
          }
        })
        rimraf(`${folderPath}/lib`, (err) => {
          if (err) {
            console.log(err)
          }
        })
        rimraf(`${folderPath}/boilerplates`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      },
    )
  },
}
