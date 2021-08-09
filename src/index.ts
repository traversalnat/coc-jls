import { ExtensionContext, services, workspace, LanguageClient } from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('coc-jls')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) {
    return
  }

  const serverOptions = {
    command: 'jedi-language-server', // run jls
  }
  const clientOptions = {
    documentSelector: ['python'], // run jls on py files
  }
  const client = new LanguageClient(
    'coc-jls', // the id
    'coc-jls', // the name of the language server
    serverOptions,
    clientOptions
  )
  context.subscriptions.push(services.registLanguageClient(client))
}
