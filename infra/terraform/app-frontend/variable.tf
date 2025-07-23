variable "tenancy_ocid" {}
variable "user_ocid" {}
variable "fingerprint" {}
variable "private_key_path" {}
variable "region" {
  default = "us-ashburn-1" # Troque para sua região se necessário
}
variable "compartment_ocid" {}
variable "ssh_public_key" {
  description = "Chave pública SSH para acessar a instância"
}
