// @ts-check

/**
  * Determines whether a user has the required permission to view a resource
  * @param {Object} user An Costasiella Account object with groups & permissions
  * @return {Array} An array of permissions (strings)
  */
export function getAllPermissions(user) {
    /**
     * @type {Object}
     */
    const permissions = {}
    /**
     * @type {Object}
     */
    const groups = user.groups
    if (groups.edges) {
      for (let edge_index in groups.edges) {
        let group_edge = groups.edges[edge_index]
        if (group_edge.node) {
          let group_node = group_edge.node 
          if (group_node.permissions.edges) {
            for (let permission_index in group_node.permissions.edges) {
              let permission_edge = group_node.permissions.edges[permission_index] 
              if (permission_edge.node) {
                let permission_node = permission_edge.node
                let codename = permission_node.codename
                let codename_split = codename.split('_')
                // If code name is not in permissions, create a new set
                if (!(codename_split[1] in permissions)) {
                permissions[codename_split[1]] = new Set()
                }
                // Add permission name to set
                permissions[codename_split[1]].add(codename_split[0])
              }
            }
          }
        }
      }
    }
    
    return permissions
}


/**
  * Determines whether a user has the required permission to view a resource
  * @param {Array} permissions An Array of permissions
  * @param {string} permission The permission to check for
  * @param {string} resource The resource for which to check permissions
  * @return {boolean}
  */
export function hasPermission(permissions, permission, resource) {
  let you_shall_not_pass = true

  if (resource in permissions) {
    if (permissions[resource].has(permission)) {
      you_shall_not_pass = false
    }
  }
  
  return !you_shall_not_pass
}
