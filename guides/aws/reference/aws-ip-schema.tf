# Reference IP schema for the Security VPC.
# Plug into the `vpcs` variable of the SWFW `security_vpc` module.
# CIDR layout: /22 carved into 8 subnet groups × 4 AZ slots, /28 each.

security_vpc = {
  name = "security-vpc"
  cidr = "10.51.0.0/22"
  subnets = {
    # Value of `nacl` must match key of objects stored in `nacls`

    # SUBNET-0-0-TGW-ATTACH
    "10.51.0.0/28"  = { az = "us-east-2a", subnet_group = "tgw_attach" }
    "10.51.1.0/28"  = { az = "us-east-2b", subnet_group = "tgw_attach" }
    "10.51.2.0/28"  = { az = "us-east-2a", subnet_group = "tgw_attach" }
    "10.51.3.0/28"  = { az = "us-east-2b", subnet_group = "tgw_attach" }

    # SUBNET-1-16-GWLBE-OUTBOUND
    "10.51.0.16/28" = { az = "us-east-2a", subnet_group = "gwlbe_outbound" }
    "10.51.1.16/28" = { az = "us-east-2b", subnet_group = "gwlbe_outbound" }
    "10.51.2.16/28" = { az = "us-east-2a", subnet_group = "gwlbe_outbound" }
    "10.51.3.16/28" = { az = "us-east-2b", subnet_group = "gwlbe_outbound" }

    # SUBNET-2-32-GWLBE-EASTWEST
    "10.51.0.32/28" = { az = "us-east-2a", subnet_group = "gwlbe_eastwest" }
    "10.51.1.32/28" = { az = "us-east-2b", subnet_group = "gwlbe_eastwest" }
    "10.51.2.32/28" = { az = "us-east-2a", subnet_group = "gwlbe_eastwest" }
    "10.51.3.32/28" = { az = "us-east-2b", subnet_group = "gwlbe_eastwest" }

    # SUBNET-3-48-GWLB ALLOCATE ALL AZ'S IN REGION
    "10.51.0.48/28" = { az = "us-east-2a", subnet_group = "gwlb" }
    "10.51.1.48/28" = { az = "us-east-2b", subnet_group = "gwlb" }
    "10.51.2.48/28" = { az = "us-east-2c", subnet_group = "gwlb" }
    "10.51.3.48/28" = { az = "us-east-2c", subnet_group = "gwlb" }

    # SUBNET-4-64-FW-DATA-PRIVATE
    "10.51.0.64/28" = { az = "us-east-2a", subnet_group = "private", nacl = "trusted-path-monitoring" }
    "10.51.1.64/28" = { az = "us-east-2b", subnet_group = "private", nacl = "trusted-path-monitoring" }
    "10.51.2.64/28" = { az = "us-east-2a", subnet_group = "private", nacl = "trusted-path-monitoring" }
    "10.51.3.64/28" = { az = "us-east-2b", subnet_group = "private", nacl = "trusted-path-monitoring" }

    # SUBNET-5-80-FW-DATA-MGMT
    "10.51.0.80/28" = { az = "us-east-2a", subnet_group = "mgmt" }
    "10.51.1.80/28" = { az = "us-east-2b", subnet_group = "mgmt" }
    "10.51.2.80/28" = { az = "us-east-2a", subnet_group = "mgmt" }
    "10.51.3.80/28" = { az = "us-east-2b", subnet_group = "mgmt" }

    # SUBNET-6-96-FW-DATA-PUBLIC
    "10.51.0.96/28" = { az = "us-east-2a", subnet_group = "public" }
    "10.51.1.96/28" = { az = "us-east-2b", subnet_group = "public" }
    "10.51.2.96/28" = { az = "us-east-2a", subnet_group = "public" }
    "10.51.3.96/28" = { az = "us-east-2b", subnet_group = "public" }

    # SUBNET-7-112-NAT-GW
    "10.51.0.112/28" = { az = "us-east-2a", subnet_group = "natgw" }
    "10.51.1.112/28" = { az = "us-east-2b", subnet_group = "natgw" }
    "10.51.2.112/28" = { az = "us-east-2a", subnet_group = "natgw" }
    "10.51.3.112/28" = { az = "us-east-2b", subnet_group = "natgw" }
  }
}
