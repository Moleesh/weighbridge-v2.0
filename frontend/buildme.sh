const fs = require('fs-extra')
async function BuildMe () {
  await fs.move('build','../backend/target/classes/public' , { overwrite: true } ).then(() => {
    console.log('success !');
  }).catch(err => {
    console.error(err);
  });
}

BuildMe()