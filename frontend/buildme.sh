const fs = require('fs-extra')
async function example () {
  try {
        await fs.move('build','dist/META-INF/resources' , { overwrite: true } )
        .then(() => {
        console.log('success!')
        })
        .catch(err => {
        console.error(err)
        })
      } catch (err) {
    console.error(err)
  }
}

example()
