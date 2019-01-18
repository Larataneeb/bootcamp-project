const User = require('../../../models/User')

const userResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a user given a user id.

  const user = await User.query().findById(args.id)
  return user
}

const usersResolver = async (obj, args, context) => {
  const { substr, hometown, house, concentration, hobbies } = args
  /* TODO: Write a resolver which returns a list of all users.

  Once you're done, implement the following pieces of functionality one by one:

  If any of the following arguments are provided, apply the corresponding filter:
    - substr: include only users whose name contains the substring
    - hometown: include only users from that hometown
    - house: include only users from that house
    - concentration: include only users who have that concentration
    - hobbies: include only users who have indicated one of the hobbies in that list
  */

  const Query = User.query()

  if (substr) {
    Query.where('name', 'like', `%${substr}%`) // <-- only if param exists
  }

  if (hometown) {
    Query.where('hometown', hometown)
  }

  if (house) {
    Query.where('house', house)
  }

  if (concentration) {
    Query.where('concentration', concentration)
  }

  // if (hobbies) {
  //   Query.where()
  // }
  const information = await Query
  return information
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
  },
}

module.exports = resolver
