# VPC that auto-creates the subnets
resource "google_compute_network" "test_vpc_network" {
  name = "test-vpc-network"
  description = "Test description"

  # The following is the default
  # auto_create_subnetworks = true
}

// A isolated compute address
resource "google_compute_address" "test_ip_address" {
  name = "my-test-address"
}

// subnetwork's address
resource "google_compute_subnetwork" "test_subnetwork" {
  name          = "my-test-subnet"
  ip_cidr_range = "10.0.0.0/16"
  region        = "us-central1"
  network       = google_compute_network.test_vpc_network.id
}

resource "google_compute_address" "internal_with_subnet_and_address" {
  name         = "my-internal-address"
  subnetwork   = google_compute_subnetwork.test_subnetwork.id
  address_type = "INTERNAL"
  address      = "10.0.42.42"
  region       = "us-central1"
}