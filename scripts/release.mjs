import fs from 'node:fs'
import process from 'node:process'
import { execSync } from 'node:child_process'
import minimist from 'minimist'
import { green } from './utils.mjs'

const args = minimist(process.argv.slice(2))
const publish = args.publish
const nocolor = args.nocolor
const successLog = msg => nocolor ? console.log(msg) : console.log(green(msg))

const { version: oldVersion } = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

execSync('bumpp --no-commit --no-tag --no-push', { stdio: 'inherit' })

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

if (oldVersion === version) {
  console.log('canceled.')
  process.exit()
}

execSync('npm run changelog')
execSync('npm run build', { stdio: 'inherit' })

execSync('git add .', { stdio: 'inherit' })
execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })

successLog('\n✨ Release success.')

if (publish) {
  execSync('npm publish', { stdio: 'inherit' })
  successLog('\n✨ Published success.')
}
