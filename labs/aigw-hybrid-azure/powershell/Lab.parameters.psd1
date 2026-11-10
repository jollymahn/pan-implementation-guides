@{
    # ── Placement ────────────────────────────────────────────────────────────
    Prefix   = 'aigw-lab'
    Location = 'centralus'

    Tags = @{
        project = 'aigw-hybrid-lab'
        owner   = 'lab'
    }

    # ── Lab mode ─────────────────────────────────────────────────────────────
    # $true encodes the constraints of a $200 free-credit subscription: a
    # 4 vCPU Total Regional Cores quota and 3 Standard public IPs. The scripts
    # check the requested footprint against these before creating anything.
    LabMode           = $true
    RegionalCoreQuota = 4
    PublicIpQuota     = 3

    # ── Network ──────────────────────────────────────────────────────────────
    VNetAddressSpace = '10.0.0.0/16'
    AksSubnetPrefix  = '10.0.1.0/24'
    VmSubnetPrefix   = '10.0.2.0/24'

    # Must not overlap VNetAddressSpace. The AKS default of 10.0.0.0/16 does,
    # and cluster creation fails with ServiceCidrOverlapExistingSubnetsCidr.
    ServiceCidr  = '172.16.0.0/16'
    DnsServiceIp = '172.16.0.10'

    # ── AKS ──────────────────────────────────────────────────────────────────
    # Standard_B2s and Standard_B2als_v2 are commonly rejected on free-tier
    # subscriptions. Standard_D2als_v7 is the size validated for this lab.
    # Change NodeVcpus alongside NodeVmSize or the quota check lies.
    AksNodeCount = 1
    NodeVmSize   = 'Standard_D2als_v7'
    NodeVcpus    = 2

    # Empty on purpose. Zone pinning this size in centralus failed with
    # AvailabilityZoneNotSupported.
    AvailabilityZones = @()

    # ── Keycloak ─────────────────────────────────────────────────────────────
    DeployKeycloak        = $true
    KeycloakInternalLb    = $true
    KeycloakInternalIp    = '10.0.1.250'
    KeycloakAdminUsername = 'admin'
    KeycloakImage         = 'quay.io/keycloak/keycloak:26.0'

    # Backs the H2 database with a managed disk. Without it, every pod restart
    # wipes the realm and rotates the signing keys behind the JWKS pasted into
    # SCM, which then rejects every token with nothing obvious in the logs.
    # managed-csi is the StandardSSD_LRS class AKS creates by default, and 4Gi
    # is Azure's practical floor for a managed disk.
    KeycloakStorageClass  = 'managed-csi'
    KeycloakStorageSize   = '4Gi'

    # ── AI Gateway data plane ────────────────────────────────────────────────
    AirsGwNamespace = 'airs-gw'
    AirsGwRepoUrl   = 'https://portkey-ai.github.io/airs-gw-helm'
    AirsGwChart     = 'airs-gw'

    # Path to the values.yaml downloaded from the SCM Gateway Registration
    # wizard, relative to the powershell directory. It carries live
    # credentials, so it is gitignored.
    ScmValuesFile = 'values.yaml'
    GatewayPort   = 8787

    # Turn on at Phase 6, then re-run 03-Install-AigwDataPlane.ps1.
    EnableJwtAuth    = $false
    JwtDefaultScopes = 'completions.write'

    # ── Windows traffic generator ────────────────────────────────────────────
    DeployWindowsVm = $true
    WindowsVmSize   = 'Standard_D2als_v7'
    WindowsVmVcpus  = 2
    WindowsUsername = 'labadmin'

    # Restrict to your own address. Find it with: (Invoke-RestMethod ifconfig.me/ip)
    RdpSourceAddressPrefix = '*'

    # ── Phase 6 only ─────────────────────────────────────────────────────────
    DeployAcr = $false
}
