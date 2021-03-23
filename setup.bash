#/usr/bin/env bash
# Bootstrap setup for the environment
sudo apt update -y
sudo apt dist-upgrade -y
sudo apt autoremove -y
sudo apt install -y curl flex bison gcc g++ checkinstall tcl8.6 tcl8.6-dev

wget https://download.redis.io/releases/redis-6.2.1.tar.gz
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
exec bash
nvm install --lts
nvm use --lts
git clone https://github.com/SDC3-HENDRIX/SDC-API.git

tar -xzvf redis-6.2.1.tar.gz


