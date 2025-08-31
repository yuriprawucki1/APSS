import { extract } from "@/utils/extract"

export const env = {
  LDAP_URL: process.env.LDAP_URL || "",
  LDAP_DOMAIN: extract.domainFromLdapBindDN(process.env.LDAP_URL || ""),
  LDAP_HOST: extract.hostFromLdapUrl(process.env.LDAP_URL || ""),
  LDAP_PORT: extract.portFromLdapUrl(process.env.LDAP_URL || "") || 389,
  LDAP_TIMEOUT: Number(process.env.LDAP_TIMEOUT) || 0,
  LDAP_CONNECTION_TIMEOUT: Number(process.env.LDAP_CONNECTION_TIMEOUT) || 0,
  LDAP_MINIMUM_TLS_VERSION: process.env.LDAP_MINIMUM_TLS_VERSION || "TLSv1.2",
  LDAP_STRICT_DN: process.env.LDAP_STRICT_DN === "true" || true,
  LDAP_BIND_DN: process.env.LDAP_BIND_DN || "",
  LDAP_BIND_PASSWORD: process.env.LDAP_BIND_PASSWORD || "",
  LDAP_BASE_DN: extract.baseDNFromLdapBindDN(process.env.LDAP_BIND_DN || ""),
  LDAP_GROUP_ADMIN: process.env.LDAP_GROUP_ADMIN || "",
}
