import { kebabCase } from 'scule'
const createNodeWithType = (type: any) => (node: any, { attrs }: any) => {
  return {
    type,
    props: attrs || {},
    children: [node]
  }
}
const marks = {
  italic: createNodeWithType('emphasis'),
  strike: createNodeWithType('delete'),
  bold: createNodeWithType('strong'),
  link: createNodeWithType('link'),
  code: createNodeWithType('inlineCode')
}
const handlers = {
  doc: (node: any) => ({
    type: 'root',
    children: node.content ? node.content.map((node: any) => visit(node)) : [],
    props: {}
  }),
  horizontalRule: () => ({
    type: 'thematicBreak',
    props: {},
    children: []
  }),
  text: (node: any) => {
    let _node = {
      type: 'text',
      value: node.text
    }
    if (node.marks) {
      //@ts-ignore
      _node = node.marks.reduce((_node, { type, attrs }) => {
        //@ts-ignore
        return marks[type](_node, { attrs })
      }, _node)
    }
    return _node
  },
  //@ts-ignore
  paragraph: node => ({
    type: 'paragraph',
    //@ts-ignore
    children: node.content ? node.content.map(node => visit(node)) : [],
    props: {}
  }),
  //@ts-ignore
  orderedList: node => ({
    type: 'list',
    ordered: true,
    props: {},
    children: node.content.map(visit)
  }),
  //@ts-ignore
  bulletList: node => ({
    type: 'list',
    ordered: false,
    props: {},
    children: node.content.map(visit)
  }),
  //@ts-ignore
  listItem: node => ({
    type: 'listItem',
    props: {},
    children: node.content.map(visit)
  }),
  //@ts-ignore
  heading: node => {
    node.content = node.content || []
    //@ts-ignore
    const id = kebabCase(node.content.map(n => n.text))
    let children = node.content.map(visit)

    return {
      type: 'heading',
      depth: node.attrs.level,
      props: {
        id
      },
      children
    }
  }
}
//@ts-ignore
function visit(node) {
  //@ts-ignore
  if (handlers[node.type]) {
    //@ts-ignore
    node = handlers[node.type](node)
  }
  return node
}

//@ts-ignore
export function tiptapToAst(tree) {
  return visit(tree)
}