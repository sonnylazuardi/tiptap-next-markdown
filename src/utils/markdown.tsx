import toMarkdown from 'mdast-util-to-markdown'
import unified from 'unified';
import parse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import strigify from 'remark-stringify'

function compiler() {
  //@ts-ignore
  this.Compiler = function(root) {
    return root
  }
}

//@ts-ignore
export function markdownToAst(markdown) {
  //@ts-ignore
  let stream = unified().use(parse).use(remarkGfm)

  const file = stream.use(compiler).processSync({ contents: markdown })
  return file.result
}


function jsonParser() {
  //@ts-ignore
  this.Parser = function(root) {
    return JSON.parse(root)
  }
}
//@ts-ignore
export function astToMarkdown(ast) {
  //@ts-ignore
  let stream = unified()
    .use(jsonParser)
    .use(remarkGfm)
    .use(strigify, {
      bullet: '-'
    })
    .processSync({ contents: JSON.stringify(ast) })
  return stream.contents
}