resource "azurerm_network_security_group" "vm" {
  count               = var.deploy_windows_vm ? 1 : 0
  name                = "${var.prefix}-win-nsg"
  resource_group_name = azurerm_resource_group.lab.name
  location            = azurerm_resource_group.lab.location
  tags                = var.tags

  security_rule {
    name                       = "AllowRDP"
    priority                   = 1000
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "3389"
    source_address_prefix      = var.rdp_source_address_prefix
    destination_address_prefix = "*"
  }
}

resource "azurerm_public_ip" "vm" {
  count               = var.deploy_windows_vm ? 1 : 0
  name                = "${var.prefix}-win-pip"
  resource_group_name = azurerm_resource_group.lab.name
  location            = azurerm_resource_group.lab.location
  sku                 = "Standard"
  allocation_method   = "Static"
  tags                = var.tags
}

resource "azurerm_network_interface" "vm" {
  count               = var.deploy_windows_vm ? 1 : 0
  name                = "${var.prefix}-win-nic"
  resource_group_name = azurerm_resource_group.lab.name
  location            = azurerm_resource_group.lab.location
  tags                = var.tags

  ip_configuration {
    name                          = "ipconfig1"
    subnet_id                     = azurerm_subnet.vm.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.vm[0].id
  }
}

resource "azurerm_network_interface_security_group_association" "vm" {
  count                     = var.deploy_windows_vm ? 1 : 0
  network_interface_id      = azurerm_network_interface.vm[0].id
  network_security_group_id = azurerm_network_security_group.vm[0].id
}

resource "azurerm_windows_virtual_machine" "traffic_generator" {
  count               = var.deploy_windows_vm ? 1 : 0
  name                = "${var.prefix}-win"
  computer_name       = "aigwlabwin"
  resource_group_name = azurerm_resource_group.lab.name
  location            = azurerm_resource_group.lab.location
  size                = var.windows_vm_size
  admin_username      = var.windows_admin_username
  admin_password      = local.windows_admin_password
  tags                = var.tags

  network_interface_ids = [azurerm_network_interface.vm[0].id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
  }

  source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2022-datacenter-azure-edition"
    version   = "latest"
  }

  # The VM shares the 4 vCPU regional quota with the AKS pool. Building it
  # after the cluster means a quota failure surfaces here rather than halfway
  # through cluster creation.
  depends_on = [azurerm_kubernetes_cluster.aks]
}
