export const strongPasswordPattern =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,}$/
export const ldapDCPattern = /DC=([^,]+)/gi
export const ldapDCReplacePattern = /DC=/i
export const ldapBaseDNPattern = /(DC=[^,]+(?:,DC=[^,]+)*)$/i
export const ldapUrlHostPattern = /^ldaps?:\/\/([^:/]+)(:\d+)?/i
export const ldapUrlPortPattern = /:(\d+)(?:\/|$)/
