import path from 'path'

import Conf from 'conf'
import yaml from 'js-yaml'

import schema from './schema'

export default new Conf({
    cwd: path.join(process.cwd(), 'content', 'config'),
    schema: schema,
    clearInvalidConfig: true,
    fileExtension: 'yml',
    serialize: yaml.safeDump,
    deserialize: yaml.safeLoad,
})
