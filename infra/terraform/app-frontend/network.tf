resource "oci_core_virtual_network" "bookinfix_vcn" {
  cidr_block     = "10.0.0.0/16"
  compartment_id = var.compartment_ocid
  display_name   = "bookinfix-vcn"
}

resource "oci_core_internet_gateway" "igw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_virtual_network.bookinfix_vcn.id
  display_name   = "bookinfix-igw"
}

resource "oci_core_route_table" "rt" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_virtual_network.bookinfix_vcn.id

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.igw.id
  }
}

resource "oci_core_security_list" "sec_list" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_virtual_network.bookinfix_vcn.id

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
}

resource "oci_core_subnet" "bookinfix_subnet" {
  cidr_block              = "10.0.0.0/24"
  compartment_id          = var.compartment_ocid
  vcn_id                  = oci_core_virtual_network.bookinfix_vcn.id
  display_name            = "bookinfix-subnet"
  prohibit_public_ip_on_vnic = false
  route_table_id          = oci_core_route_table.rt.id
  security_list_ids       = [oci_core_security_list.sec_list.id]
}
