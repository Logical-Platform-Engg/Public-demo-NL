provider "google" {
  credentials = var.google_credentials
  project     = var.project
  region      = "us-central1"
}

variable "google_credentials" {
  type = string  
}

variable "project" {}

resource "google_storage_bucket" "example_bucket" {
  name          = "example-bucket-${random_id.example.hex}"
  location      = "US"
  force_destroy = true
}

resource "random_id" "example" {
  byte_length = 8
}
