data "oci_identity_availability_domains" "ads" {
  compartment_id = var.compartment_ocid
}

data "oci_core_images" "ubuntu" {
  compartment_id           = var.compartment_ocid
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "22.04"
  shape                    = "VM.Standard.E2.1.Micro"
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

resource "oci_core_public_ip" "bookinfix_static_ip" {
  compartment_id = var.compartment_ocid
  lifetime       = "RESERVED"
  display_name   = "bookinfix-static-ip"
}

resource "oci_core_instance" "bookinfix_vm" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_ocid
  shape               = "VM.Standard.E2.1.Micro"
  display_name        = "bookinfix-vm"

  create_vnic_details {
    subnet_id         = oci_core_subnet.bookinfix_subnet.id
    assign_public_ip  = true
    display_name      = "bookinfix-vnic"
  }

  source_details {
    source_type           = "image"
    source_id             = data.oci_core_images.ubuntu.images[0].id
    boot_volume_size_in_gbs = 50
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
  }
}

resource "null_resource" "run_script" {
  depends_on = [oci_core_instance.bookinfix_vm]

  provisioner "file" {
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("./my-key-pem.pem")
      host        = oci_core_instance.bookinfix_vm.public_ip
    }

    source      = "init.sh"
    destination = "/home/ubuntu/init.sh"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("./my-key-pem.pem")
      host        = oci_core_instance.bookinfix_vm.public_ip
    }

    inline = [
      "chmod +x /home/ubuntu/init.sh",
      "sudo /home/ubuntu/init.sh"
    ]
  }
}
