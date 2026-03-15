const fs = require('fs');
const path = require('path');

module.exports = {
  onBuild: ({ constants }) => {
    const handlerPath = path.join(constants.INTERNAL_FUNCTIONS_SRC, '___netlify-server-handler/___netlify-server-handler.mjs');
    if (fs.existsSync(handlerPath)) {
      let content = fs.readFileSync(handlerPath, 'utf8');
      content = content.replace(/\\/g, '/');
      fs.writeFileSync(handlerPath, content);
      console.log('Successfully patched Windows paths in ___netlify-server-handler.mjs');
    } else {
      console.log('Handler not found at', handlerPath);
    }
  }
}
