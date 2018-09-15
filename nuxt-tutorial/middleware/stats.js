export default function ({route}) {
  console.log('route.fullPath: ', route.fullPath)
  return Promise.resolve(false)
}

