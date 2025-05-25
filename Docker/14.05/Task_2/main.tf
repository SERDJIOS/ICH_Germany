# SG to allow SSH connections from anywhere

resource "aws_security_group" "allow_ssh_pub" {
  name        = var.sg_name
  description = "Allow SSH inbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH from the internet"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "terraform-allow_ssh_pub"
  }
}





# Create aws_ami filter to pick up the ami available in your region
data "aws_ami" "amazon-linux-2" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}


# Configure the EC2 instance in a public subnet



resource "aws_instance" "ec2_public" {
  key_name                   = var.ssh_key_name
  ami                        = data.aws_ami.amazon-linux-2.id
  associate_public_ip_address = true
  instance_type               = var.ec2_size
  subnet_id                   = var.vpc_public_subnets[0]
  vpc_security_group_ids      = [
    aws_security_group.allow_ssh_pub.id
  ]
  user_data                   = templatefile("${path.module}/install_ec2_docker.sh", {})

  root_block_device {
    delete_on_termination = true
    encrypted             = true
    volume_size           = var.volume_size
  }
  tags = {
    Name = var.instance_name_tag
  }
}
