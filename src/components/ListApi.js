import { Dot, Link } from '@geist-ui/react'

const ListApi = ({ items }) => (
  <>
  {items.map(item => (
    <Dot style={{ width: '100%' }} key={item.path}>
      <Link style={{ textTransform: 'none' }} color icon underline href={`/api${item.path}`} target='_blank'>/api{item.path}</Link>
      {item.page && (
        <>
          {` `}(<Link href={item.path}>Docs</Link>)
        </>
      )}
      {item.items?.length > 0 && (
        <ListApi {...item} />
      )}
    </Dot>
  ))}
</>
)

export default ListApi
