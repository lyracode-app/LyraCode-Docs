import type MarkdownIt from 'markdown-it'

/** Place the toolbar after each article's lead, keeping its original H1 and anchors. */
export function articleActions(md: MarkdownIt) {
  md.core.ruler.after('inline', 'lyra-article-actions', state => {
    const heading = state.tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1')
    if (heading < 0) return
    for (let index = heading + 3; index < state.tokens.length; index++) {
      const current = state.tokens[index]
      if (current.type === 'heading_open') break
      if (current.type === 'paragraph_close' && current.level === 0) {
        const token = new state.Token('html_block', '', 0)
        token.content = '<ArticleActions />\n'
        state.tokens.splice(index + 1, 0, token)
        break
      }
    }
  })
}
