import {
  ldapBaseDNPattern,
  ldapDCPattern,
  ldapDCReplacePattern,
  ldapUrlHostPattern,
  ldapUrlPortPattern,
} from "@/constants/regex"

class Extract {
  /**
   * Extracts the full domain from an LDAP Bind DN by parsing all `DC` components.
   *
   * @param ldapBindDN - The LDAP Bind DN (e.g., "CN=User,OU=Users,DC=sub,DC=example,DC=com").
   * @returns The extracted domain in "sub.example.com" format, or an empty string if not found.
   *
   * @example
   * domainFromLdapBindDN("CN=Admin,OU=IT,DC=example,DC=com");
   * // Returns: "example.com"
   *
   * @example
   * domainFromLdapBindDN("CN=User,OU=People,DC=sub,DC=example,DC=org,DC=br");
   * // Returns: "sub.example.org.br"
   *
   * @example
   * domainFromLdapBindDN("CN=InvalidUser,OU=Test");
   * // Returns: ""
   */
  public domainFromLdapBindDN(ldapBindDN: string): string {
    const matches = ldapBindDN.match(ldapDCPattern)
    if (matches) {
      return matches.map((dc) => dc.replace(ldapDCReplacePattern, "")).join(".")
    }
    return ""
  }

  /**
   * Extracts the Base Distinguished Name (Base DN) from an LDAP Bind DN.
   *
   * @param ldapBindDN - The LDAP Bind DN (e.g., "CN=User,OU=Users,DC=example,DC=com").
   * @returns The Base DN (e.g., "DC=example,DC=com"), or an empty string if not found.
   *
   * @example
   * baseDNFromLdapBindDN("CN=Admin,OU=IT,DC=example,DC=com");
   * // Returns: "DC=example,DC=com"
   *
   * @example
   * baseDNFromLdapBindDN("CN=User,OU=People,DC=sub,DC=example,DC=org");
   * // Returns: "DC=sub,DC=example,DC=org"
   *
   * @example
   * baseDNFromLdapBindDN("CN=InvalidUser");
   * // Returns: ""
   */
  public baseDNFromLdapBindDN(ldapBindDN: string): string {
    const matches = ldapBindDN.match(ldapBaseDNPattern)
    if (matches) {
      return matches[1]
    }
    return ""
  }

  /**
   * Extracts the host from an LDAP URL.
   *
   * @param ldapUrl - The LDAP URL (e.g., "ldap://ldap.example.com:389").
   * @returns The extracted host (e.g., "ldap.example.com"), or an empty string if not found.
   *
   * @example
   * hostFromLdapUrl("ldap://ldap.example.com:389");
   * // Returns: "ldap.example.com"
   *
   * @example
   * hostFromLdapUrl("ldap://mydomain.org");
   * // Returns: "mydomain.org"
   *
   * @example
   * hostFromLdapUrl("invalid-url");
   * // Returns: ""
   */
  public hostFromLdapUrl(ldapUrl: string): string {
    const matches = ldapUrl.match(ldapUrlHostPattern)
    return matches ? matches[1] : ""
  }

  /**
   * Extracts the port number from an LDAP URL.
   *
   * @param ldapUrl - The LDAP URL (e.g., "ldap://ldap.example.com:636").
   * @returns The port number as a number (e.g., 636), or null if not found.
   *
   * @example
   * portFromLdapUrl("ldap://ldap.example.com:389");
   * // Returns: 389
   *
   * @example
   * portFromLdapUrl("ldap://secure.example.com:636");
   * // Returns: 636
   *
   * @example
   * portFromLdapUrl("ldap://example.com");
   * // Returns: null
   */
  public portFromLdapUrl(ldapUrl: string): number | null {
    const matches = ldapUrl.match(ldapUrlPortPattern)
    return matches ? Number(matches[1]) : null
  }
}

export const extract = new Extract()
