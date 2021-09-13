import Link from 'components/Link'

const ListApi = ({ items }) => (
  <ul>
  {items.map(item => (
    <li>
      <a href={`/api${item.path}`} target='_blank'>/api{item.path}</a>
      {item.page && (
        <>
          {` `}(<Link href={item.path}>Docs</Link>)
        </>
      )}
      {item.items?.length > 0 && (
        <ListApi {...item} />
      )}
    </li>
  ))}
</ul>
)

export default ListApi
