//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/hrasvaka.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Entryfile for hrasvaka file
//                       |

import config from './config'
import { connectToDatabase } from './api/database'
import startWebserver from './server/index'

async function main(): Promise<void> {
    await connectToDatabase()
    await startWebserver(
        config.get('server.port') as number,
        config.get('server.host') as string,
    )
}

main()
