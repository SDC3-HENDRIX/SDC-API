#/usr/bin/env bash
# Install dependencies
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
echo "Installed docker dependencies"
# Get GPG Key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# Add GPG Key
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
echo "Installed Docker's GPG key"
# Install docker engine
sudo apt-get update -y && sudo apt-get install docker-ce docker-ce-cli containerd.io
echo "Installed Docker"
# Get Docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# Make docker-compose executable
sudo chmod +x /usr/local/bin/docker-compose
echo "Downloaded docker-compose and installed it at `/usr/local/bin`"
# create docker group
sudo groupadd docker
sudo usermod -aG docker $USER
