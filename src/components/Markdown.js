import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
  html: true
})

const Markdown = ({ className, children }) => (
  <div className={className || ''} dangerouslySetInnerHTML={{ __html: md.render(children) }} />
)

export default Markdown
