#!bin/bash

sudo apt update -y
sudo apt upgrade -y
sudo apt autoremove -y

# NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
exec bash
nvm install --lts
nvm use --lts
