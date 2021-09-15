export const itemify = (old) => {
  return {
    id: 'abc123',
    type: 'handaxe',
    price: 5000,
    properties: [{
      id: 'abc123'
    }]
  }
}


// HELPERS
const getTypeDescription = (description) => description?.value || null
const getTypeType = (type) => {
  const t = type?.name?.value

  if (t?.kind === 'ObjectTypeDefinition') {
    return t.name.value
  }

  return t || null
}

export const convertTypesToModels = (typeDefs) => {
  return typeDefs.definitions.reduce((all, type, idx) => {
    if (idx === 0) {
      console.log('AAAAAAAAAA', type.fields[0])
      console.log('AAAAAAAAAA', type.fields[1])
    }
    // console.log(getTypeType(type.fields.map(field => field.type)).filter(field => field.toString() !== field))
    all.push({
      description: getTypeDescription(type.description),
      name: type.name.value,
      fields: type.fields.map(field => ({
        name: field.name.value,
        description: getTypeDescription(field.description),
        type: idx === 0 ? field.type.type.name.value : getTypeType(field.type),
        manyResults: field.type.kind === 'ListType'
      }))
    })
  
    return all
  }, [])
}