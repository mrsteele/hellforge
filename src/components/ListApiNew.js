import { Dot, Link, Collapse } from '@geist-ui/react'

const MockCollapse = ({ title, children }) => (
  <div>
    {title}
    {children}
  </div>
)

const ListApi = ({ path, items, noCollapse }) => {
  const El = noCollapse ? MockCollapse : Collapse
  return (
    <El title={path}>
      {items.map(item => (
        <Dot style={{ width: '100%' }} key={item.path}>
          <Link style={{ textTransform: 'none' }} color icon underline href={`/api${item.path}`} target='_blank'>/api{item.path}</Link>
          {item.page && (
            <>
              {` `}(<Link href={item.path}>Docs</Link>)
            </>
          )}
          {item.items?.length > 0 && (
            <ListApi noCollapse {...item} />
          )}
        </Dot>
      ))}
    </El>
  )
}

export default ListApi
