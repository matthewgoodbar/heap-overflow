#!usr/bin/env bash

set -o errexit
npm run build
bundle install
rails db:migrate
rails db:seed