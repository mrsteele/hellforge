import styles from './Model.module.scss'

const Model = ({ title, description, route, properties }) => (
  <div className={styles.wrapper}>
    <h4>{title}</h4>
    <p>{description}</p>
    {route && <code>https://d2api.vercel.com/api/v2{route}</code>}
    <h5>Properties</h5>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {(properties || []).map(prop => (
          <tr>
            <td>{prop.name}</td>
            <td>{prop.type}</td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Model