export type MemberHash = number

export const generateMemberHash = (members: number[]) => {
  const sortedMembers = members.sort()
  const stringRepresentation = JSON.stringify(sortedMembers)
  let hash = 0
  for (let i = 0; i < stringRepresentation.length; i++) {
    const char = stringRepresentation.charCodeAt(i)
    hash = (hash << 5) - hash + char // Simple hash calculation
    hash |= 0 // Convert to 32-bit integer
  }
  return hash
}
