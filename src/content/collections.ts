import {readdirSync, readFileSync} from "fs"
import yaml from "js-yaml"

const contentDir = __dirname

export interface Collection {
  name: string
  path: string
  // Fields provided by */collection.yml
  type?: string
  component?: string
  sortBy?: string[]
}

export default readdirSync(contentDir, {withFileTypes: true})
  .filter((e) => e.isDirectory())
  .map<Collection>((e) => ({
    name: e.name,
    path: `${contentDir}/${e.name}`,
    // load collection configs from */collection.yml
    ...yaml.load(readFileSync(`${contentDir}/${e.name}/collection.yml`)),
  }))
