import { ipcMain } from 'electron'

ipcMain.on('background-task', (event, args) => {
  const result = doSomething(args)

  event.sender.send('background-task-response', result)
})

const doSomething = (_args: any) => {
  const random = Math.random()

  return random.toString()
}
