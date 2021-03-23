#/usr/bin/env bash
# Bootstrap setup for the environment
sudo apt update -y
sudo apt dist-upgrade -y
sudo apt autoremove -y
sudo apt install -y curl wget flex bison gcc g++ checkinstall tcl8.6 tcl8.6-dev pkg-config ruby2.7 ruby-full

wget https://download.redis.io/releases/redis-6.2.1.tar.gz
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
exec bash
nvm install --lts
nvm use --lts
chmod +x ./install
sudo ./install auto > /tmp/logfile

