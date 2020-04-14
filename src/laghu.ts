//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/laghu.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Entryfile for laghu file
//                       |

import { connectToDatabase } from './database'

async function main(): Promise<void> {
    await connectToDatabase()
}

main()
