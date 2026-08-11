#!/usr/bin/env sh
set -eu

# MongoDB replica-set 인증키는 PC별 로컬 비밀정보이므로 Git으로 공유하지 않습니다.
# The MongoDB replica-set key is a machine-local secret and must not be committed.
repository_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
key_path="$repository_root/mongo-keyfile"

if [ -f "$key_path" ]; then
  echo 'mongo-keyfile already exists; leaving it unchanged.'
  exit 0
fi

umask 077
openssl rand -base64 756 | tr -d '\n' > "$key_path"
echo 'Created local mongo-keyfile. Do not commit or share this file.'
