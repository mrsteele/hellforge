import ListApi from 'components/ListApi'
import Model from 'components/Model'
import fetch from 'lib/fetch'

const models = [{
  title: 'Range',
  description: 'A simple way to represent a range of values',
  route: false,
  properties: [{
    name: 'min',
    type: 'Number',
    description: 'The lower value.'
  }, {
    name: 'max',
    type: 'Number',
    description: 'The higher value.'
  }]
}, {
  title: 'ItemProperty',
  description: 'An individual property that can be added to magical items.',
  route: '/items/properties/:id',
  properties: [{
    name: 'id',
    type: 'String',
    description: 'The unique identifier to represent the item property.'
  }, {
    name: 'display',
    type: 'String',
    description: 'The label as it shows up on the item. Underscore is replaced with the value'
  }, {
    name: 'num1',
    type: 'Range',
    description: 'The first value for the property.'
  }, {
    name: 'num2',
    type: 'Range',
    description: 'The second value for the property'
  }]
}]

export default ({ files }) => (
  <div>
    <h2>v2 API</h2>
    
    <p>These have been translated into something more human-readable (Work-In-Progress).</p>
    
    <h3>Models</h3>

    <p>The following models are below.</p>

    {models.map(model => <Model {...model} />)}

    <h3>Routes</h3>
    <ListApi items={files} />

  </div>
)

export async function getServerSideProps(context) {
  const uniqueitems = await fetch('/api/v2/items/unique')
  return {
    props: {
      files: [{
        path: '/v2/items/unique',
        items: uniqueitems.map(item => ({
          path: `/v2/items/unique/${item.id}`
        }))
      }]
    }, // will be passed to the page component as props
  }
}
